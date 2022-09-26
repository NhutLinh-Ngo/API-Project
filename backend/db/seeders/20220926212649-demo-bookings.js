'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Bookings', [
			{
				spotId: 2,
				userId: 1,
				startDate: '2022-09-28',
				endDate: '2022-10-28'
			},
			{
				spotId: 1,
				userId: 3,
				startDate: '2022-09-10',
				endDate: '2022-10-10'
			}
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Bookings', null, {});
	}
};
