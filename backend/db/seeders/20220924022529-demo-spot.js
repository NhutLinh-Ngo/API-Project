'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Spots', [
			{
				ownerId: 2,
				address: '101 Wilshire Blvd, Santa Monica, CA 90401',
				city: 'Santa Monica',
				state: 'California',
				country: 'United States',
				lat: 34.017365,
				lng: -118.501863,
				name: 'Luxurious Penthouse, Sunset Views & Great location',
				description:
					'Luxurious ocean front living! Unbelievable sunsets flood this home through floor to ceiling windows giving this luxury residence a laid back yet modern vibe. Kick your feet up with the cozy fire pit and admire the twinkling lights of the pier.',
				price: 835
			},
			{
				ownerId: 2,
				address: '3008 Ocean Ave, Venice, CA 90291',
				city: 'Los Angeles',
				state: 'California',
				country: 'United States',
				lat: 33.982601,
				lng: -118.461163,
				name: 'Resort Style Villa in Venice Canals-Right By Beach',
				description:
					'Resort style living right in the heart of the Venice Canals. This classic Venice hacienda is the epitome of vacation living. The home is BRAND NEW, construction finished August 2021 with completely new kitchen, appliances, bathroom, and furnishings.',
				price: 764
			},
			{
				ownerId: 2,
				address: '59 Rose Ave, Venice, CA 90291',
				city: 'Los Angeles',
				state: 'California',
				country: 'United States',
				lat: 33.995883,
				lng: -118.478805,
				name: 'Venice Oasis',
				description:
					'Enjoy locally-sourced unforgettable experiences at a colorful and a home full of character in Venice. Pick tomatoes and herbs from the rooftop garden, and fire up the pizza oven with the ocean as your backdrop. ',
				price: 1200
			}
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Spots', null, {});
	}
};
