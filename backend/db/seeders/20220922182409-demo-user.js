'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'Users',
			[
				{
					firstName: 'Dylan',
					lastName: 'Luu',
					email: 'dylannlyy@user.io',
					username: 'dylan-luu',
					hashedPassword: bcrypt.hashSync('dylanLuu')
				},
				{
					firstName: 'David',
					lastName: 'Liaw',
					email: 'Cokeboi@user.io',
					username: 'Cokeboi68',
					hashedPassword: bcrypt.hashSync('cokeboi123')
				},
				{
					firstName: 'Curtis',
					lastName: 'Chung',
					email: 'cc@user.io',
					username: 'curtisC',
					hashedPassword: bcrypt.hashSync('curtisChung')
				}
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			'Users',
			{
				username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
			},
			{}
		);
	}
};
