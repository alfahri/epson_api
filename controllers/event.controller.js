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
		schedule_end: req.body.schedule_end,
		iframe_embed: req.body.iframe_embed,
		schedule_date: req.body.schedule_date
	}).then(event => {
		res.status(200).send({ message: "success", status: true, data: [] })
	}).catch(err => {
		res.status(500).send({ message: "error", status: false, data: err.message })
	})
}

exports.getAgenda = (req, res) => {
	if (req.body.institusi == 4) {
		Event.findAll({ group: 'institusi' }).then(event => {
			res.status(200).send({ message: "success", data: event, status: true })
		})
	}else {
		Event.findOne({
			where: {
				institusi: req.body.institusi
			}
		}).then(event => {
			res.status(200).send({ message: "success", data: event, status: true })
		})
	}
}

exports.deleteAgenda = (req, res) => {
	Event.destroy({
		where: {
			id: req.body.id
		}
	}).then(event => {
		res.status(200).send({ message: "success", status: true })
	})
}

exports.getDetailAgenda = (req, res) => {
	Event.findOne({
		where: {
			id: req.query.id
		}
	}).then(event => {
		if (!event) {
			res.status(200).send({ message: "No data", status: false, data: [] })
		}
		res.status(200).send({ message: "success", status: true, data: event })
	})
}

exports.updateAgenda = (req, res) => {
	Event.update({
		nama: req.body.nama,
		institusi: req.body.institusi,
		duration: req.body.totalDuration,
		description: req.body.description,
		participant: req.body.participant,
		schedule_start: req.body.schedule_start,
		schedule_end: req.body.schedule_end,
		iframe_embed: req.body.iframe_embed,
		schedule_date: req.body.schedule_date
	}, {
		where: {
			id: req.body.id
		}
	}).then(event => {
		res.status(200).send({ message: "success", status: true })
	}).catch(err => {
		res.status(500).send({ message: err.message })
	})
}