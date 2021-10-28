const { authJwt } = require('../middleware');
const controller = require('../controllers/email.controller');

module.exports = function(app) {
	app.post('/api/forgotPassword/sendmail', controller.sendmail);
	app.post('/api/email/checkExists', controller.checkExists);
}