'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('SpotImages', [
			{
				spotId: 1,
				url: 'https://a0.muscache.com/im/pictures/miso/Hosting-674702777246888979/original/838c0f78-d558-4478-93c8-6a487a628395.png?im_w=960',
				preview: true
			},
			{
				spotId: 1,
				url: 'https://a0.muscache.com/im/pictures/miso/Hosting-674702777246888979/original/e92860cc-1756-4321-946d-1bbc527f5586.png?im_w=720',
				preview: false
			},
			{
				spotId: 1,
				url: 'https://a0.muscache.com/im/pictures/miso/Hosting-674702777246888979/original/26342c25-a2cb-4148-bb89-3a10cc4d7cb2.png?im_w=720',
				preview: false
			},
			{
				spotId: 1,
				url: 'https://a0.muscache.com/im/pictures/miso/Hosting-674702777246888979/original/bcc0bf0c-1dfd-4543-8e42-9458dd2e2f4e.png?im_w=720',
				preview: false
			},
			{
				spotId: 1,
				url: 'https://a0.muscache.com/im/pictures/miso/Hosting-674702777246888979/original/5af90900-115f-4d95-92d7-14549a2f23dd.png?im_w=720',
				preview: false
			},
			{
				spotId: 2,
				url: 'https://a0.muscache.com/im/pictures/1c8f0a3e-f04b-4c07-b0be-65e91ca2a5f4.jpg?im_w=1200',
				preview: true
			},
			{
				spotId: 2,
				url: 'https://a0.muscache.com/im/pictures/66f7fd49-2e29-4091-93c3-a4f390d97807.jpg?im_w=720',
				preview: false
			},
			{
				spotId: 2,
				url: 'https://a0.muscache.com/im/pictures/ae3c50fd-8432-46ac-bcf1-9668e5d75c21.jpg?im_w=720',
				preview: false
			},
			{
				spotId: 2,
				url: 'https://a0.muscache.com/im/pictures/1493801d-3fb9-4100-9d31-1010285066c4.jpg?im_w=720',
				preview: false
			},
			{
				spotId: 2,
				url: 'https://a0.muscache.com/im/pictures/c0a362ff-2310-455a-9dce-636f619b3874.jpg?im_w=720',
				preview: false
			},
			{
				spotId: 3,
				url: 'https://a0.muscache.com/im/pictures/3d202e46-ee9d-4bcc-abdc-fb4a089a32ca.jpg?im_w=720',
				preview: true
			},
			{
				spotId: 3,
				url: 'https://a0.muscache.com/im/pictures/26da20c3-c6f2-4195-86c9-c79f15999dab.jpg?im_w=720',
				preview: false
			},
			{
				spotId: 3,
				url: 'https://a0.muscache.com/im/pictures/6e8480be-9456-4487-a58d-650c6c5bc4bf.jpg?im_w=1200',
				preview: false
			},
			{
				spotId: 3,
				url: 'https://a0.muscache.com/im/pictures/5373db59-9414-4191-97c1-19722a1a22f2.jpg?im_w=720',
				preview: false
			},
			{
				spotId: 3,
				url: 'https://a0.muscache.com/im/pictures/da4d73ee-4386-431b-a405-d5d4efd411a3.jpg?im_w=1200',
				preview: false
			}
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkdelete('SpotImages', null, {});
	}
};
