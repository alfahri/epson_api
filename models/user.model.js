module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define("users", {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		email: {
			type: Sequelize.STRING
		},
		password: {
			type: Sequelize.STRING
		},
		first_name: {
			type: Sequelize.STRING
		},
		last_name: {
			type: Sequelize.STRING
		},
		institusi: {
			type: Sequelize.STRING
		},
		company: {
			type: Sequelize.STRING
		},
		job_title: {
			type: Sequelize.STRING
		},
		phone_number: {
			type: Sequelize.STRING
		},
		alamat: {
			type: Sequelize.TEXT
		},
		token: {
			type: Sequelize.STRING
		},
		verified: {
			type: Sequelize.STRING,
			defaultValue: 'N'
		},
		thumbnail: {
			type: Sequelize.STRING
		}
	})

	return User;
}