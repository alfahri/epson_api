var fs = require('fs')
const { authJwt } = require('../middleware');
const uploadFile = require('../middleware/upload')
const controller = require('../controllers/user.controller');

module.exports = function(app) {
	app.get("/api/test/all", controller.allAccess);

	app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

	app.get("/api/user/list/register", controller.listUserPending);
	app.post("/api/user/updateStatus", controller.updateStatus);

	app.post("/api/user/reject", controller.reject);

	app.post("/api/tes/gambar", uploadFile.single("file"), (req, res) => {
		res.status(200).send({ filename: req.file.filename })
	})
	app.post("/api/user/getDetail", controller.getDetail)

	app.get("/public/assets/:namaFile", (req, res) => {
		return res.send({ message: 'mantap' })
	})

	app.get("/api/user/list/all", controller.getAllStatus);

	app.get('/api/email/sendtes', controller.sendMailTes);
	app.post("/api/user/cms/create", controller.createUser)
	app.post("/api/user/update/gambar", controller.updateGambarUser)
	app.post('/api/user/import/excel', controller.importExcel)
	app.get('/api/user/history/login', controller.historyLogin)
	app.post('/api/user/reset-password', [authJwt.verifyToken], controller.resetPassword)
}