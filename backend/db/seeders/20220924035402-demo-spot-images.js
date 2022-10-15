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
			},
			{
				spotId: 4,
				url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-53196534/original/9a803ca2-e53b-464d-b7a6-9d41986e86d9.jpeg?im_w=1200',
				preview: true
			},
			{
				spotId: 4,
				url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-53196534/original/74893a45-627f-4382-9c61-cd2fb56d2a52.jpeg?im_w=720',
				preview: false
			},
			{
				spotId: 4,
				url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-53196534/original/8f64926e-ad51-42d1-99aa-78266a0cc1ef.jpeg?im_w=720',
				preview: false
			},
			{
				spotId: 4,
				url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-53196534/original/de72e3c1-499d-4fc9-9275-46c07a43ece1.jpeg?im_w=1440',
				preview: false
			},
			{
				spotId: 4,
				url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-53196534/original/ead0b6ee-6e0b-4763-8914-79a29d7c1893.jpeg?im_w=1440',
				preview: false
			},
			{
				spotId: 5,
				url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-645949816519904365/original/6154b760-7a75-4b83-b8ff-67adc670d6fc.jpeg?im_w=1200',
				preview: true
			},
			{
				spotId: 5,
				url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-645949816519904365/original/49fd1c41-3258-48ac-880c-17ea081115c7.jpeg?im_w=720',
				preview: false
			},
			{
				spotId: 5,
				url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-645949816519904365/original/fb49f881-708e-46c7-a801-09c1b5057f04.jpeg?im_w=720',
				preview: false
			},
			{
				spotId: 5,
				url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-645949816519904365/original/13e3acdd-74f5-4491-be00-6630e20cdaf9.jpeg?im_w=720',
				preview: false
			},
			{
				spotId: 5,
				url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-645949816519904365/original/7fe2e236-8367-4bfc-a5f5-fb00134d7dc7.jpeg?im_w=1200',
				preview: false
			},
			{
				spotId: 6,
				url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-54066931/original/b6b2958e-229b-4f36-8315-d5881413c53c.jpeg?im_w=1200',
				preview: true
			},
			{
				spotId: 6,
				url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-54066931/original/d18dea2e-3ce8-4582-8016-dca0f8e9452a.jpeg?im_w=720',
				preview: false
			},
			{
				spotId: 6,
				url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-54066931/original/b483751a-2ab7-4a1b-aec3-767c0601bd68.jpeg?im_w=720',
				preview: false
			},
			{
				spotId: 6,
				url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-54066931/original/e166d193-344d-4b7b-8b5c-7965c90bf45f.jpeg?im_w=1200',
				preview: false
			},
			{
				spotId: 6,
				url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-54066931/original/21809608-07f2-46ca-9a3b-0f4e0a173522.jpeg?im_w=720',
				preview: false
			},
			{
				spotId: 7,
				url: 'https://a0.muscache.com/im/pictures/323bfedd-a975-40f1-9c14-bbe3f5898a83.jpg?im_w=1200',
				preview: true
			},
			{
				spotId: 7,
				url: 'https://a0.muscache.com/im/pictures/7b15d40d-32bb-4a66-94d3-0b8429cb5b0c.jpg?im_w=720',
				preview: false
			},
			{
				spotId: 7,
				url: 'https://a0.muscache.com/im/pictures/b4d3caa7-a0ff-44a2-bbfd-85db5cdef88d.jpg?im_w=720',
				preview: false
			},
			{
				spotId: 7,
				url: 'https://a0.muscache.com/im/pictures/83ffc71a-fb2d-4cea-bc82-098ca018ecb8.jpg?im_w=720',
				preview: false
			},
			{
				spotId: 7,
				url: 'https://a0.muscache.com/im/pictures/dbba7a28-1efe-435d-91fd-c9be8ddea287.jpg?im_w=720',
				preview: false
			},
			{
				spotId: 8,
				url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-53185744/original/39cdf06a-ad66-4f8d-9e96-2d65248a47ca.jpeg?im_w=1200',
				preview: true
			},
			{
				spotId: 8,
				url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-53185744/original/99fb92d3-2a4a-4a2e-892a-334594d1c005.jpeg?im_w=720',
				preview: false
			},
			{
				spotId: 8,
				url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-53185744/original/893ef8f6-7f8b-4a84-ac6d-35897d8b7e63.jpeg?im_w=720',
				preview: false
			},
			{
				spotId: 8,
				url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-53185744/original/20241eb9-7836-4428-be8b-60b28819d26b.jpeg?im_w=720',
				preview: false
			},
			{
				spotId: 8,
				url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-53185744/original/5a5b4700-afa7-49f0-befc-5345620202e0.jpeg?im_w=720',
				preview: false
			},
			{
				spotId: 9,
				url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-53195532/original/78b8f44e-a9b7-47eb-9216-0c1e95957425.jpeg?im_w=1200',
				preview: true
			},
			{
				spotId: 9,
				url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-53195532/original/b72ea891-01fa-4aa6-b6aa-5c19dfa3b3d9.jpeg?im_w=720',
				preview: false
			},
			{
				spotId: 9,
				url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-53195532/original/7284b11d-ec15-4383-8619-d69f4b87215f.jpeg?im_w=720',
				preview: false
			},
			{
				spotId: 9,
				url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-53195532/original/b519693e-e172-4bd5-a816-ecc7f27a4e70.jpeg?im_w=720',
				preview: false
			},
			{
				spotId: 9,
				url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-53195532/original/32384d90-bf77-4498-a940-4314ad181499.jpeg?im_w=720',
				preview: false
			},
			{
				spotId: 10,
				url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-53193771/original/04d51f97-d4a0-4372-82fb-c3cff7d9f90a.jpeg?im_w=1200',
				preview: true
			},
			{
				spotId: 10,
				url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-53193771/original/98833c55-97a4-41ca-9181-c89e7d5e2426.jpeg?im_w=720',
				preview: false
			},
			{
				spotId: 10,
				url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-53193771/original/f895f091-f856-4a42-bc3b-cdad9d7c961d.jpeg?im_w=720',
				preview: false
			},
			{
				spotId: 10,
				url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-53193771/original/709a8726-bd2b-4b4a-860f-6a16ca42edee.jpeg?im_w=720',
				preview: false
			},
			{
				spotId: 10,
				url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-53193771/original/2002e92d-5b9c-4b0c-83ea-1cb1d3846591.jpeg?im_w=720',
				preview: false
			}
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkdelete('SpotImages', null, {});
	}
};
