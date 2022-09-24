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
			Spot.belongsTo(models.User, { foreignKey: 'ownerId' });
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
				validate: {
					len: [1, 250]
				}
			},
			city: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [1, 250]
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
					}
				}
			},
			lat: {
				type: DataTypes.DECIMAL,
				validate: {
					isDecimal: true
				}
			},
			lng: {
				type: DataTypes.DECIMAL,
				validate: {
					isDecimal: true
				}
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [1, 250]
				}
			},
			description: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [1, 250]
				}
			},
			price: {
				type: DataTypes.DECIMAL,
				allowNull: false,
				validate: {
					min: 1
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
