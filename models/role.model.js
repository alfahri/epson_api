module.exports = (sequelize, Sequelize) => {
	const Role = sequelize.define("role", {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true
		},
		nama: {
			type: Sequelize.STRING
		}
	})

	return Role;
}