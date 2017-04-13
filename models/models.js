const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	username: {type: String, required: true},
	name: {
		firstName: {type: String, required: true},
		lastName: {type: String, required: true}
	},
	players: [String],
	sessions: [{
		game: {type: String},
		players: [String],
		winner: {type: String},
		timeStamp: {type: Date, default: Date.now}
	}]
})

userSchema.methods.dashboardInfo = function(){
	return {
		username: this.username,
		myFirstName: this.name.firstName,
		recentPlayers: this.players,
		sessions: this.sessions.slice(-5, -1),
		allGames: this.allGames
	}
}

userSchema.virtual("allGames").get(function(){
	return Object.keys(
		this.sessions.reduce((uniqueNames, session) => {
		uniqueNames[session.game] = true;
		return uniqueNames
		}, {})
	)
})

const User = mongoose.model('User', userSchema);

module.exports = {User, userSchema};