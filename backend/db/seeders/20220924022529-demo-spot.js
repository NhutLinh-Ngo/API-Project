'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Spots', [
			{
				ownerId: 2,
				address: '123 cokeBoi street',
				city: 'Lady Bug',
				state: 'PA',
				country: 'USA',
				lat: 30.3435343,
				lng: 145.3234234,
				name: 'Coke House',
				description: 'Perfect weekend getaway',
				price: 59.99
			},
			{
				ownerId: 2,
				address: '5675 Running Away St',
				city: 'Dont Stop',
				state: 'OK',
				country: 'Canada',
				lat: 24.3435343,
				lng: 135.3234234,
				name: 'Running Home',
				description: 'Awesome home gym',
				price: 159.99
			}
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Spots', null, {});
	}
};
