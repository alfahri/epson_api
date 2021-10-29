const { authJwt } = require('../middleware');
const controller = require('../controllers/event.controller');

module.exports = function(app) {
	app.get('/api/event/list', controller.list);
}