'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Booking extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Booking.belongsTo(models.User, { foreignKey: 'userId' });
			Booking.belongsTo(models.Spot, { foreignKey: 'spotId' });
		}
	}
	Booking.init(
		{
			spotId: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			startDate: {
				type: DataTypes.DATEONLY,
				allowNull: false,
				validate: {
					isAfter: {
						args: new Date().toJSON().slice(0, 10),
						msg: `Booking date can only be made after today`
					}
				}
			},
			endDate: {
				type: DataTypes.DATEONLY,
				allowNull: false,
				validate: {
					beforeStartDate(value) {
						if (value <= this.startDate)
							throw new Error(
								'checkout date cannot come before or be the same as checkin date'
							);
					}
				}
			}
		},
		{
			sequelize,
			modelName: 'Booking'
		}
	);
	return Booking;
};
