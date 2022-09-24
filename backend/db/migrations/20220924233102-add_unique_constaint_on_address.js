'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addConstraint('Spots', {
			fields: ['address'],
			type: 'unique',
			name: 'unique_constraint_address'
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeConstraint('Spots', 'unique_constraint_address');
	}
};
