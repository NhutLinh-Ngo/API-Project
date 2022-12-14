'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class SpotImage extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			SpotImage.belongsTo(models.Spot, { foreignKey: 'spotId' });
		}
	}
	SpotImage.init(
		{
			spotId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				onDelete: 'cascade'
			},
			url: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: 'url required for image'
					},
					isUrl: {
						msg: 'please provide porper image URL'
					}
				}
			},
			preview: {
				allowNull: false,
				type: DataTypes.BOOLEAN,
				defaultValue: false,
				validate: {
					notNull: {
						msg: 'Preview indication required'
					}
				}
			}
		},
		{
			sequelize,
			modelName: 'SpotImage'
		}
	);
	return SpotImage;
};
