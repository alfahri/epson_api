const db = require("../models");
const config = require("../config/auth.config");
const Event = db.event;

var jwt = require('jsonwebtoken');

exports.list = (req, res) => {
	Event.findAll().then(event => {
		if(event.length <= 0) {
			return res.status(200).send({ message: "No Data", status: false, data: [] })
		}

		res.status(200).send({ message: "success", status: true, data: event })
	})
}

exports.create = (req, res) => {
	Event.create({
		nama: req.body.nama_event,
		institusi: req.body.institusi,
		duration: req.body.totalDuration,
		description: req.body.description,
		participant: req.body.participant,
		schedule_start: req.body.schedule_start,
		schedule_end: req.body.schedule_end
	}).then(event => {
		res.status(200).send({ message: "success", status: true, data: [] })
	}).catch(err => {
		res.status(500).send({ message: "error", status: false, data: err.message })
	})
}

exports.getAgenda = (req, res) => {
	Event.findOne({
		where: {
			institusi: req.body.institusi
		}
	}).then(event => {
		res.status(200).send({ message: "success", data: event, status: true })
	})
}