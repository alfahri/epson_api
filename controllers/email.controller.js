var nodemailer = require('nodemailer');
const db = require('../models');
const config = require("../config/auth.config");
const User = db.user;

var jwt = require('jsonwebtoken');

exports.sendmail = async (req, res) => {
	var transporter = nodemailer.createTransport({
		host: "smtpdm-ap-southeast-1.aliyun.com",
		port: 465,
		secure: true,
		auth: {
			user: "no-reply@epsonvirtuallaunching.com",
			pass: "5p6stosuSL"
		}
	})

	var token = jwt.sign({email:req.body.email}, config.secret, {
		expiresIn: 60
	})

	var mailOptions = {
		from: "no-reply@epsonvirtuallaunching.com",
		to: req.body.email,
		cc: "",
		bcc: "",
		subject: "Forgot Password",
		text: `This is your link for forgot password http://192.168.20.66:8081/#/reset-password/${token}/${req.body.email}`,
	}

	if (req.body.fromRegis) {
		mailOptions.subject = "Registration successfully"
		mailOptions.text = "Thank you for register in epson event. you can login after admin approved your registration. thank you"
	}

	let info = await transporter.sendMail(mailOptions, function(error, info) {
		if (error) {
			res.status(500).send({message: error});
		}

		res.status(200).send({message: 'Berhasil kirim email'});
	})
}

exports.checkExists = (req, res) => {
	User.findOne({
		where: {
			email: req.body.email
		}
	}).then(user => {
		if (!user) {
			return res.status(200).send({ message: 'Email tidak terdaftar', status: false })
		}

		res.status(200).send({ message: 'Email ada', status: true })
	})
}