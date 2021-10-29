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