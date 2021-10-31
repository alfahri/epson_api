const { authJwt } = require('../middleware');
const controller = require('../controllers/event.controller');

module.exports = function(app) {
	app.get('/api/event/list', controller.list);
	app.post('/api/event/create', controller.create);
	app.post("/api/get/agenda/institusi", controller.getAgenda);
}