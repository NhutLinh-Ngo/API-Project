'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('SpotImages', [
			{
				spotId: 1,
				url: 'image url preview',
				preview: true
			},
			{
				spotId: 1,
				url: 'image url1 not preview',
				preview: false
			},
			{
				spotId: 1,
				url: 'image url2 not preview',
				preview: false
			},
			{
				spotId: 1,
				url: 'image url3 not preview',
				preview: false
			},
			{
				spotId: 2,
				url: 'image url preview',
				preview: true
			},
			{
				spotId: 2,
				url: 'image url3 not preview',
				preview: false
			},
			{
				spotId: 2,
				url: 'image url4 not preview',
				preview: false
			},
			{
				spotId: 2,
				url: 'image url5 not preview',
				preview: false
			}
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkdelete('SpotImages', null, {});
	}
};
