const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {User, userSchema} = require('../models/models.js');
console.log(userSchema.methods);

for (let method in userSchema.methods){
	router.get("/" + method, (req, res) => {
		User.findOne()
		.exec()
		.then((user) => {
			res.send(user[method]());
		})
	})
}

// router.get('/dashboard-info', (req, res) => {
// 	User.findOne()
// 		.exec()
// 		.then((user) => {
// 			res.send(user.dashboardInfo());
// 		})
// })


module.exports = router;