var express = require('express');
var router = express.Router();

var path = require('path');

var HomeCtrl = require('../controllers/home');
var homeController = new HomeCtrl();


/* GET home page. */
router.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '..', '..', 'client/views/index.html'));
});

router.get('/md5', function(req, res) {
	res.sendFile(path.join(__dirname, '..', '..', 'client/views/md5.html'));
});

router.post('/md5', function(req, res) {
	homeController.getMd5(req.body.text)
		.then(data => {
			res.status(200).json(data);
		})
		.catch(error => {
			res.json({
				msg: 'Error',
				error: error
			});
		})
});

router.get('*', function(req, res, next) {
	res.status(404).send('Page Not Found!');
});

module.exports = router;