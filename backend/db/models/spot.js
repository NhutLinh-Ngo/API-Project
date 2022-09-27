'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Spot extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Spot.belongsTo(models.User, { as: 'Owner', foreignKey: 'ownerId' });
			Spot.hasMany(models.Booking, { foreignKey: 'spotId' });
			Spot.hasMany(models.SpotImage, { foreignKey: 'spotId' });
			Spot.hasMany(models.Review, { foreignKey: 'spotId' });
		}
	}
	Spot.init(
		{
			ownerId: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			address: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					len: [1, 250],
					notNull: {
						msg: 'Street address is required'
					}
				}
			},
			city: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [1, 250],
					notNull: {
						msg: 'City is required'
					}
				}
			},
			state: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [2, 250],
					hasNumber(value) {
						if (/[0-9]/.test(value))
							throw new Error('State input cannot containt number');
					},
					notNull: {
						msg: 'State is required'
					}
				}
			},
			country: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [1, 250],
					hasNumber(value) {
						if (/[0-9]/.test(value))
							throw new Error('State input cannot containt number');
					},
					notNull: {
						msg: 'Country is required'
					}
				}
			},
			lat: {
				type: DataTypes.DECIMAL,
				isDecimal: true,
				validate: {
					isDecimal: {
						msg: 'Latitude is not valid'
					}
				}
			},
			lng: {
				type: DataTypes.DECIMAL,
				isDecimal: true,
				validate: {
					isDecimal: {
						msg: 'Longitude is not valid'
					}
				}
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: {
						args: [1, 250],
						msg: 'Name must be less than 50 characters'
					},
					notNull: {
						msg: 'Name is required'
					}
				}
			},
			description: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: 'Description is required'
					},
					len: {
						args: [1, 5000],
						msg: 'Name must be less than 5000 characters'
					}
				}
			},
			price: {
				type: DataTypes.DECIMAL,
				allowNull: false,
				validate: {
					min: {
						args: [1],
						msg: 'Minimum price is $1'
					},
					notNull: {
						msg: 'Price per day is required'
					}
				}
			}
		},
		{
			sequelize,
			modelName: 'Spot'
		}
	);
	return Spot;
};
