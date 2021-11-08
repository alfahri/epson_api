module.exports = (sequelize, Sequelize) => {
	const LogAgenda = sequelize.define("log_agenda", {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		id_user: {
			type: Sequelize.STRING
		},
		id_agenda: {
			type: Sequelize.STRING
		},
		first_name: {
			type: Sequelize.STRING
		},
		last_name: {
			type: Sequelize.STRING
		},
		email: {
			type: Sequelize.STRING
		},
		duration: {
			type: Sequelize.INTEGER
		}
	})

	return LogAgenda;
}