const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const UserAdmin = db.useradmin;
const Role = db.role;

const email = require("./email.controller")

const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.signup = (req, res) => {
	User.create({
		email: req.body.email,
		first_name: req.body.firstName,
		last_name: req.body.lastName,
		institusi: req.body.institution,
		password: bcrypt.hashSync(req.body.password, 8),
		company: req.body.company,
		job_title: req.body.jobTitle,
		phone_number: req.body.phoneNumber,
		alamat: req.body.address,
		thumbnail: req.body.thumbnail,
	})
	.then(user => {
		if (req.body.roles) {
			Role.findAll({
				where: {
					name: {
						[Op.or]: req.body.roles
					}
				}
			}).then(roles => {
				user.setRoles(roles).then(() => {
					res.status(201).send({message: 'User telah berhasil didaftar'});
				})
			})
		}else {
			// req.body.fromRegis = true
			// email.sendmail(req)
			res.status(201).send({message: 'User telah berhasil didaftar'});
		}
	})
	.catch(err => {
		res.status(500).send({message: err.message});
	})
}

exports.signin = (req, res) => {
	User.findOne({
		where: {
			email: req.body.email
		}
	})
	.then(user => {
		if (!user) {
			return res.status(200).send({message: "Email tidak terdaftar", status: false});
		}

		if (user.verified == 'N') {
			return res.status(200).send({ message: "Maaf email anda belum aktif", status: false })
		}

		if (user.rejected == 1) {
			return res.status(200).send({ message: "Maaf email anda telah di reject", status: false })
		}

		var passwordIsValid = bcrypt.compareSync(
			req.body.password,
			user.password
		)

		if (!passwordIsValid) {
			return res.status(401).send({
				message: "Password salah",
				status: false
			})
		}

		var token = jwt.sign({id:user.id}, config.secret, {
			expiresIn: 3600
		})

		var authorities = [];
		res.status(200).send({
			id: user.id,
			email: user.email,
			data: user,
			accessToken: token,
			status: true
		})
	})
	.catch(err => {
		res.status(500).send({message: err.message});
	})
}

exports.signinAdmin = (req, res) => {
	UserAdmin.findOne({
		where: {
			email: req.body.email
		}
	})
	.then(user => {
		if (!user) {
			return res.status(404).send({message: "Email tidak terdaftar", status: false});
		}

		var passwordIsValid = bcrypt.compareSync(
			req.body.password,
			user.password
		)

		if (!passwordIsValid) {
			return res.status(401).send({
				message: "Password salah",
				status: false
			})
		}

		var token = jwt.sign({id:user.id}, config.secret, {
			expiresIn: 3600
		})

		var authorities = [];
		res.status(200).send({
			id: user.id,
			email: user.email,
			accessToken: token,
			status: true
		})
	})
	.catch(err => {
		res.status(500).send({message: err.message});
	})
}

exports.verifyToken = (req, res) => {
	res.status(200).send({ message: 'Token masih valid', status: true });
}