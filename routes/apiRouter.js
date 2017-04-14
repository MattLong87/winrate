const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {User, userSchema} = require('../models/models.js');
console.log(userSchema.methods);

//This automatically makes a route for each
//method on the userSchema
for (let method in userSchema.methods){
	router.get("/" + method, (req, res) => {
		User.findOne()
		.exec()
		.then((user) => {
			res.send(user[method]());
		})
	})
}
//Previous way of defining routes, replaced by above
// router.get('/dashboard-info', (req, res) => {
// 	User.findOne()
// 		.exec()
// 		.then((user) => {
// 			res.send(user.dashboardInfo());
// 		})
// })


module.exports = router;