module.exports = (sequelize, Sequelize) => {
	const Event = sequelize.define("event", {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true
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
			type: Sequelize.DATE
		},
		schedule_end: {
			type: Sequelize.DATE
		}
	})

	return Event;
}