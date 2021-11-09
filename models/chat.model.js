module.exports = (sequelize, Sequelize) => {
	const Chat = sequelize.define("chats", {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		id_user: {
			type: Sequelize.STRING
		},
		isi_pesan: {
			type: Sequelize.TEXT
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
		thumbnail: {
			type: Sequelize.STRING
		},
		email: {
			type: Sequelize.STRING
		}
	})

	return Chat;
}