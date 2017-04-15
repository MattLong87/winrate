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
		timeStamp: {type: String}
	}]
})

userSchema.methods.dashboardInfo = function(){
	return {
		username: this.username,
		myFirstName: this.name.firstName,
		overallWinrate: this.overallWinrate,
		recentPlayers: this.players,
		recentSessions: this.sessions.slice(-4).reverse(),
	}
}

userSchema.methods.allSessions = function(){
	return {
		username: this.username,
		myFirstName: this.name.firstName,
		sessions: this.sessions
	}
}

userSchema.methods.history = function(){
	return {
		username: this.username,
		allGames: this.allGames,
		allPlayers: this.allPlayers
	}
}

userSchema.virtual("overallWinrate").get(function(){
	let gamesWon = 0;
	let myName = this.name.firstName;
	this.sessions.forEach(function(session){
		if (session.winner === myName){
			gamesWon++;
		}
	})
	return gamesWon / this.sessions.length;
})

//User.allGames returns an array of all game names
//the user has played
userSchema.virtual("allGames").get(function(){
	return Object.keys(
		this.sessions.reduce((uniqueNames, session) => {
			uniqueNames[session.game] = true;
			return uniqueNames
		}, {})
	)
})

userSchema.virtual("allPlayers").get(function(){
	return Object.keys(
		this.sessions.reduce((uniquePlayers, session) => {
			session.players.forEach((player) => {
				uniquePlayers[player] = true;
			})
			return uniquePlayers
		}, {})
	)
})

const User = mongoose.model('User', userSchema);

module.exports = {User, userSchema};