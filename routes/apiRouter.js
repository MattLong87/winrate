const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

//built our own jsonParser
// const jsonParser = function(req, res, next){
// 	var body = [];
// 	req.on("data", function(chunk){
// 		body.push(chunk);
// 		console.log(chunk);
// 	}).on("end", function(){
// 		var something = Buffer.concat(body).toString();
// 		req.body = JSON.parse(something || "{}");
// 		next();
// 	})
// }

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
		console.log(req.headers);
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

router.post("/users/:id/sessions", (req, res) => {
	//should do some validation on session fields and return helpful errors
	let newSession = {};
	newSession.game = req.body.game;
	newSession.players = req.body.players;
	newSession.winner = req.body.winner;
	newSession.timeStamp = Date.now().toString();

	User.findByIdAndUpdate(req.params.id, {$push: {sessions: newSession}}, {new:true})
	.exec()
	.then((user) => {
		console.log(user);
		//sends back the session that was just created
		res.status(201).json(user.sessions.reverse()[0]);
		})
})



module.exports = router;