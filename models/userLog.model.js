module.exports = (sequelize, Sequelize) => {
	const UserLog = sequelize.define("user_log", {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		idUser: {
			type: Sequelize.INTEGER
		},
		ip: {
			type: Sequelize.STRING
		}
	})

	return UserLog;
}