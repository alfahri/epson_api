module.exports = (sequelize, Sequelize) => {
	const Event = sequelize.define("events", {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		nama: {
			type: Sequelize.STRING
		},
		institusi: {
			type: Sequelize.STRING
		},
		duration: {
			type: Sequelize.INTEGER
		},
		duration_prefix: {
			type: Sequelize.STRING
		},
		description: {
			type: Sequelize.TEXT
		},
		participant: {
			type: Sequelize.TEXT
		},
		schedule_start: {
			type: Sequelize.STRING
		},
		schedule_end: {
			type: Sequelize.STRING
		},
		iframe_embed: {
			type: Sequelize.TEXT
		},
		schedule_date: {
			type: Sequelize.DATE
		}
	})

	return Event;
}