const fs = require("fs");
const db = require('../models')
const multer = require('multer')
const upload = multer({
	dest: '../public/uploads'
})
const User = db.user
const Image = db.images

exports.allAccess = (req, res) => {
	res.status(200).send({message: 'mantap gan'});
}

exports.userBoard = (req, res) => {
	res.status(200).send("User Content");
}

exports.listUserPending = (req, res) => {
	User.findAll({
		where: {
			verified: 'N'
		}
	}).then(user => {
		if (user.length <= 0) {
			return res.status(200).send({ message: 'No Data', status: false, data: [] })
		}

		res.status(200).send({ message: 'success', status: true, data: user })
	})
}

exports.updateStatus = (req, res) => {
	User.update({ verified: req.body.verified }, {
		where: {
			id: req.body.id
		}
	}).then(user => {
		res.status(200).send({ message: "Berhasil update data" })
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