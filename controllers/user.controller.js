const fs = require("fs");
const db = require('../models')
const multer = require('multer')
const upload = multer({
	dest: '../public/uploads'
})
const moment = require("moment");
const email = require("./email.controller")
const User = db.user
const Image = db.images
const UserLog = db.userLog

const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.allAccess = (req, res) => {
	res.status(200).send({message: 'mantap gan'});
}

exports.userBoard = (req, res) => {
	res.status(200).send("User Content");
}

exports.listUserPending = (req, res) => {
	User.findAll({
		where: {
			verified: 'N',
			rejected: 0,
			email: {[Op.like]:[`%${req.query.email ?? ''}%`]},
			company: {[Op.like]:[`%${req.query.company ?? ''}%`]},
			phone_number: {[Op.like]:[`%${req.query.phone_number ?? ''}%`]},
			first_name: {[Op.like]:[`%${req.query.nama ?? ''}%`]},
			institusi: {[Op.like]:[`%${req.query.institusi ?? ''}%`]}
		}
	}).then(user => {
		if (user.length <= 0) {
			return res.status(200).send({ message: 'No Data', status: false, data: [] })
		}

		res.status(200).send({ message: 'success', status: true, data: user })
	})
}

exports.updateStatus = (req, res) => {
	User.update({
		verified: req.body.verified,
		approved_time: moment().format("YYYY-MM-DD H:mm:ss"),
		approved_by: req.body.emailAdmin
	}, {
		where: {
			id: req.body.id
		}
	}).then(user => {
		req.body.fromRegis = true
		User.findOne({
			where: {
				id: req.body.id
			}
		}).then(dataUser => {
			req.body.name = dataUser.first_name
			req.body.email = dataUser.email
			email.sendmailApproved(req)
		})

		res.status(200).send({ message: "Berhasil update data", body: req.body })
	})
}

exports.reject = (req, res) => {
	User.update({ rejected: 1 }, {
		where: {
			id: req.body.id
		}
	}).then(user => {
		req.body.fromReject = true
		req.body.email = user.email
		User.findOne({
			where: {
				id: req.body.id
			}
		}).then(dataUser => {
			req.body.name = dataUser.first_name
			req.body.email = dataUser.email
			email.sendmailRejected(req, res)
		})

		res.status(200).send({ message: "Berhasil update data", status: true })
	})
}

exports.uploadGambar = (req, res) => {
	try {
    console.log(req);

    if (req.body.file == undefined) {
      return res.send(`You must select a file.`);
    }

    Image.create({
      type: req.body.file.mimetype,
      name: req.body.file.originalname,
      data: fs.readFileSync(
        __basedir + "/public/assets/" + req.body.file.filename
      ),
    }).then((image) => {
      fs.writeFileSync(
        __basedir + "/public/assets/" + image.name,
        image.data
      );

      return res.send(`File has been uploaded.`);
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
}

exports.getDetail = (req, res) => {
	User.findOne({
		where: {
			id: req.body.id
		}
	}).then(user => {
		if (!user) {
			return res.status(200).send({ message: 'No Data', status: false, data: [] })
		}

		res.status(200).send({ message: 'success', status: true, data: user })
	})
}

exports.getAllStatus = (req, res) => {
    var jumlahData = 0
    User.findAll({
            where: {
                    verified: {[Op.notIn]:["N"]}
            }
    }).then(user => {
            jumlahData = user.length
            var limit = parseInt(req.query.limit)
		    var offset = parseInt(req.query.offset)
            User.findAll({
		            where: {
		                    verified: {[Op.notIn]:["N"]}
		            },
		            offset: offset,
		            limit: limit
		    }).then(user => {
		            if (user.length <= 0) {
		                    res.status(404).send({ message: "No Data", status: false, data: [] })
		            }

		            res.status(200).send({ message: "success", status: true, data: user, jumlahData: jumlahData })
		    })
    })
}

exports.sendMailTes= (req, res) => {
	req.body.email = "m.alfahri98@gmail.com"
	email.sendmail(req)

	res.status(200).send({ message: "success" })
}

exports.createUser = (req, res) => {
	User.create({
		email: req.body.email,
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		institusi: req.body.institution,
		password: bcrypt.hashSync(req.body.password, 8),
		company: req.body.company,
		job_title: req.body.job_title,
		phone_number: req.body.phone_number,
		alamat: req.body.address,
		thumbnail: req.body.thumbnail,
		verified: "Y"
	})
	.then(user => {
		res.status(201).send({message: 'User telah berhasil didaftar', status: true});
	})
	.catch(err => {
		res.status(500).send({message: err.message, status: false});
	})
}

exports.updateGambarUser = (req, res) => {
	User.update({ thumbnail: req.body.thumbnail }, {
		where: {
			id: req.body.id
		}
	}).then(user => {
		console.log(req.body)
		res.status(200).send({ message: "success" })
	})
}