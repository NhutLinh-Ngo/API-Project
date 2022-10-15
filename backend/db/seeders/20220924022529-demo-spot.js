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
			},
			{
				ownerId: 2,
				address: ' 4804 Seashore Dr, Newport Beach, CA 92663',
				city: 'Newport Beach',
				state: 'California',
				country: 'United States',
				lat: 33.621779,
				lng: -117.941095,
				name: 'Oceanfront Home Beach w/Private Hot Tub, Outdoor Fireplace, Patio, A/C',
				description:
					'This 3- story, luxury home has panoramic views of the beach and the shimmering Pacific from many vantage points - inside and out. Let‚Äôs start with its 3rd floor rooftop deck with a fire place, lots of comfortable seating, and best of all a spa.',
				price: 1055
			},
			{
				ownerId: 2,
				address: '19950 E Pacific Coast Hwy, Malibu, CA 90265',
				city: 'Malibu',
				state: 'California',
				country: 'United States',
				lat: 34.036841,
				lng: -118.609931,
				name: 'Stunning oceanfront beach house with balcony, grill, & fireplaces',
				description:
					'Indulge in coastal reverie at the Big Rock Seaside Beach House. Perched on the edge of the Pacific, this stunning two-bedroom boasts sweeping ocean views from every room and direct beach access.',
				price: 975
			},
			{
				ownerId: 1,
				address: '507 W Balboa Blvd',
				city: 'Newport beach',
				state: 'California',
				country: 'United States',
				lat: 33.60399,
				lng: -117.90663,
				name: 'Dreamy holiday home with beach access, ocean views, fast WiFi & rooftop deck',
				description:
					'Forget about kitschy beach condos and treat yourself to the getaway you deserve in this luxury single family home on the vibrant Balboa Peninsula of Newport Beach. You can soak up ocean views right from home base with access to a private rooftop deck',
				price: 245
			},
			{
				ownerId: 1,
				address: '1327 W Balboa Blvd, Newport Beach, CA 92661',
				city: 'Newport Beach',
				state: 'California',
				country: 'United States',
				lat: 33.606737,
				lng: -117.918733,
				name: 'Stunning Contemporary Home by Beach & Bay',
				description:
					'Stay in the lap of luxury and prepare to be visually struck as you walk into our completely remodeled property down to the studs and brought to current building standards including an air conditioning system.',
				price: 164
			},
			{
				ownerId: 1,
				address: '4711 Seashore Dr, Newport Beach, CA 92663',
				city: 'Newport beach',
				state: 'California',
				country: 'United States',
				lat: 33.622086,
				lng: -117.940272,
				name: 'Oceanfront Beach Cottage On the Sand + Unobstructed Views',
				description:
					'Welcome to this 2-bedroom, 1-bath, 1-story, 900 sq. ft. home right on the sand in Newport Beach with no boardwalk in front of it. This is the lower level unit in a 2-unit complex. There is a dining area for 4-6 and a modern kitchen.',
				price: 371
			},
			{
				ownerId: 1,
				address: 'Newport Beach, CA 92663',
				city: 'Newport beach',
				state: 'California',
				country: 'United States',
				lat: 33.621586,
				lng: -117.938839,
				name: 'Stunning Bayfront duplex with private hot tub, grill, duffy boat, large deck',
				description:
					'Beautifully located on one of the Newport Beach Channels, this 1,400 sq ft bayfront home has a large water and sunset view, patio with a beautiful spa, Fire Pit, and a table for 8 where you can dine alfresco as you enjoy a colorful western sunset.',
				price: 281
			},
			{
				ownerId: 1,
				address: '35015 Camino Capistrano, Dana Point, CA 92624',
				city: 'Dana Point',
				state: 'California',
				country: 'United States',
				lat: 33.453291,
				lng: -117.664092,
				name: 'Amazing Oceanfront Home w/ Deck, Privacy + Outdoor Living!',
				description:
					'This level of privacy and seclusion is not commonly associated with beachfront property, making it the perfect place to experience the romance, magic, & the unique energy of the ocean without the crowds.',
				price: 400
			}
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Spots', null, {});
	}
};
