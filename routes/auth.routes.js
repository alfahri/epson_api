const { authJwt } = require('../middleware');
const uploadFile = require('../middleware/upload')
const controller = require('../controllers/auth.controller');

module.exports = function(app) {
	app.post("/api/auth/signup", uploadFile.single("file"), controller.signup);
	app.post("/api/auth/signin", controller.signin);
	app.get("/api/verifyToken", [authJwt.verifyToken], controller.verifyToken);
}