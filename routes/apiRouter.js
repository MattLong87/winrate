const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {User} = require('../models/models.js');

router.get('/dashboard-info', (req, res) => {
	User.findOne()
		.exec()
		.then((user) => {
			res.send(user.dashboardInfo());
		})
})


module.exports = router;