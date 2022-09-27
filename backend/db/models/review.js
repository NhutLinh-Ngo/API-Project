'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Review extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Review.belongsTo(models.User, { foreignKey: 'userId' });
			Review.belongsTo(models.Spot, { foreignKey: 'spotId' });
			Review.hasMany(models.ReviewImage, { foreignKey: 'reviewId' });
		}
	}
	Review.init(
		{
			spotId: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			review: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: 'Review text is required'
					},
					len: {
						args: [1, 5000],
						msg: 'Review must be less than 5000 characters'
					}
				}
			},
			stars: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notNull: {
						msg: 'Stars rating required'
					},
					min: {
						args: [1],
						msg: 'Stars must be an integer from 1 to 5'
					},
					max: {
						args: [5],
						msg: 'Stars must be an integer from 1 to 5'
					}
				}
			}
		},
		{
			sequelize,
			modelName: 'Review'
		}
	);
	return Review;
};
