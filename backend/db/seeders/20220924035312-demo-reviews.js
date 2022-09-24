'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Reviews', [
			{
				spotId: 1,
				userId: 1,
				review: 'awesome place, host was great!',
				stars: 4
			},
			{
				spotId: 1,
				userId: 3,
				review: 'Love this place, will visit again',
				stars: 5
			},
			{
				spotId: 2,
				userId: 1,
				review: 'everyone book now',
				stars: 5
			},
			{
				spotId: 2,
				userId: 3,
				review: 'The place was worn down, hate it!',
				stars: 1
			}
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Reviews', null, {});
	}
};
