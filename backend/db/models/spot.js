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
					len: {
						args: [1, 250],
						msg: 'Please enter proper address'
					},
					notNull: {
						msg: 'Street address is required'
					}
				}
			},
			city: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: {
						args: [1, 250],
						msg: 'Please enter proper city'
					},
					notNull: {
						msg: 'City is required'
					}
				}
			},
			state: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: {
						args: [2, 250],
						msg: 'Please enter proper State'
					},
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
					len: {
						args: [1, 250],
						msg: 'Please enter proper Country under 250 characters'
					},
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
				type: DataTypes.FLOAT,
				isDecimal: true,
				validate: {
					isDecimal: {
						msg: 'Latitude is not valid'
					},
					min: {
						args: [-90],
						msg: 'Latitude is not valid'
					},
					max: {
						args: [90],
						msg: 'Latitude is not valid'
					}
				}
			},
			lng: {
				type: DataTypes.FLOAT,
				isDecimal: true,
				validate: {
					isDecimal: {
						msg: 'Longitude is not valid'
					},
					min: {
						args: [-180],
						msg: 'Longitude is not valid'
					},
					max: {
						args: [180],
						msg: 'Longitude is not valid'
					}
				}
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: 'Name is required'
					},
					len: {
						args: [1, 250],
						msg: 'Please Enter Proper name under 250 characters'
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
						args: [1, 250],
						msg: 'Please Enter proper description under 250 characters'
					}
				}
			},
			price: {
				type: DataTypes.FLOAT,
				allowNull: false,
				validate: {
					notNull: {
						msg: 'Price per day is required'
					},
					min: {
						args: [1],
						msg: 'Minimum price is $1'
					},
					isNumeric: {
						msg: 'Minimum price is $1'
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
