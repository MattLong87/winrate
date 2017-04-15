const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {User, userSchema} = require('../models/models.js');

router.use(jsonParser);

router.get("/", (req, res) => {
	User.findOne()
	.exec()
	.then((user) => {
		res.send(user);
	})
})

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

router.patch("/:id", (req, res) => {
	//should do some validation on session fields and return helpful errors
	let newSession = {};
	newSession.game = req.body.game;
	newSession.players = req.body.players;
	newSession.winner = req.body.winner;
	newSession.timeStamp = Date.now().toString();

	User.update({_id: req.params.id}, {$push: {sessions: newSession}})
	.exec()
	.then(() => res.status(204).end());
})



module.exports = router;