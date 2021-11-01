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

	let info = await transporter.sendMail(mailOptions, function(error, info) {
		if (error) {
			res.status(500).send({message: error});
		}

		res.status(200).send({message: 'Berhasil kirim email'});
	})
}

exports.sendmailApproved = async (req, res) => {
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
		subject: "Your Invitation to Epson Virtual Launch",
		html: `<p>Dear ${req.body.name}</p>
				<p>
				You are invited to join our Epson Virtual launch 
				Please visit https://epsonvirtuallaunching.com/
				On Wednesday 10th November 2021.
				</p>

				<p>
				Don’t forget to entry with your email and your password that you have created.
				</p>
				<p>
				See you soon
				</p>`,
	}

	let info = await transporter.sendMail(mailOptions, function(error, info) {
		if (error) {
			// res.status(500).send({message: error});

			return error
		}

		// res.status(200).send({message: 'Berhasil kirim email'});
		return "Berhasil dikirim"
	})
}

exports.sendmailRejected = async (req, res) => {
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
		subject: "Your Invitation to Epson Virtual Launch",
		html: `<p>Dear ${req.body.name}</p>

<p>
We are very sorry that we cannot invited to join our Epson Virtual launch 
</p>

<p>
See you soon
</p>
`,
	}

	let info = await transporter.sendMail(mailOptions, function(error, info) {
		if (error) {
			// res.status(500).send({message: error});

			return error
		}

		// res.status(200).send({message: 'Berhasil kirim email'});
		return "Berhasil dikirim"
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