module.exports = (sequelize, Sequelize) => {
	const UserAdmin = sequelize.define("admin_users", {
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
		}
	})

	return UserAdmin;
}