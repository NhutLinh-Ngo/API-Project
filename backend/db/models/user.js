'use strict';
const { Model, Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		static associate(models) {
			// define association here
			User.hasMany(models.Booking, { foreignKey: 'userId', hooks: true });
			User.hasMany(models.Spot, { foreignKey: 'ownerId' });
			User.hasMany(models.Review, { foreignKey: 'userId' });
		}

		toSafeObject() {
			const { id, firstName, lastName, username, email } = this; // context will be the User instance
			return { id, firstName, lastName, username, email };
		}

		validatePassword(password) {
			return bcrypt.compareSync(password, this.hashedPassword.toString());
		}

		static getCurrentUserById(id) {
			return User.scope('currentUser').findByPk(id);
		}

		static async login({ credential, password }) {
			const { Op } = require('sequelize');
			const user = await User.scope('loginUser').findOne({
				where: {
					[Op.or]: {
						username: credential,
						email: credential
					}
				}
			});
			if (user && user.validatePassword(password)) {
				return await User.scope('currentUser').findByPk(user.id);
			}
		}

		static async signup({ username, email, password, firstName, lastName }) {
			const hashedPassword = bcrypt.hashSync(password);
			const user = await User.create({
				firstName,
				lastName,
				email,
				username,
				hashedPassword
			});
			return await User.scope('currentUser').findByPk(user.id);
		}
	}

	User.init(
		{
			firstName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: {
						args: [1, 50],
						msg: 'first Name is 50 character max'
					}
				}
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: {
						args: [1, 50],
						msg: 'Last Name is 50 character max'
					}
				}
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: {
					args: true,
					msg: 'Username already in uses!'
				},
				validate: {
					len: {
						args: [4, 30],
						msg: 'Username is 30 character max'
					},
					isNotEmail(value) {
						if (Validator.isEmail(value)) {
							throw new Error('Cannot be an email.');
						}
					}
				}
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: {
					args: true,
					msg: 'Email address already in use!'
				},
				validate: {
					len: {
						args: [3, 250],
						msg: 'email has 250 character limit'
					},
					isEmail: true
				}
			},
			hashedPassword: {
				type: DataTypes.STRING.BINARY,
				allowNull: false,
				validate: {
					len: [60, 60]
				}
			}
		},
		{
			sequelize,
			modelName: 'User',
			defaultScope: {
				attributes: {
					exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
				}
			},
			scopes: {
				currentUser: {
					attributes: { exclude: ['hashedPassword'] }
				},
				loginUser: {
					attributes: {}
				}
			}
		}
	);
	return User;
};
