const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	username: {type: String, required: true},
	name: {
		firstName: {type: String, required: true},
		lastName: {type: String, required: true}
	},
	sessions: [{
		game: {type: String},
		players: [String],
		winner: {type: String},
		timeStamp: {type: String}
	}]
})

userSchema.methods.dashboardInfo = function(){
	var players = this.allPlayers.slice(-5).reverse();
	var self = this;
	//calculates the winrate for each player and returns array with
	//[playerName, winrate]
	var playersWithWinrates = players.map(function(player){
		var gamesPlayed = 0;
		gamesWon = 0;
		self.sessions.forEach(function(session){
			if (session.players.indexOf(player) !== -1){
				gamesPlayed++;
				if (session.winner == player){
					gamesWon++;
				}
			}
		})
		return [player, gamesWon/gamesPlayed];
	})
	return {
		username: this.username,
		myFirstName: this.name.firstName,
		overallWinrate: this.overallWinrate,
		recentPlayers: playersWithWinrates,
		recentSessions: this.sessions.slice(-4).reverse(),
	}
}

userSchema.methods.allSessions = function(){
	return {
		username: this.username,
		myFirstName: this.name.firstName,
		sessions: this.sessions.reverse(),
		id: this._id
	}
}

userSchema.methods.history = function(){
	return {
		username: this.username,
		allGames: this.allGames,
		allPlayers: this.allPlayers,
		id: this._id
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

//returns array of all players user has had sessions with
//from oldest to newest
userSchema.virtual("allPlayers").get(function(){
	let allPlayers = [];
	this.sessions.forEach(function(session){
		session.players.forEach(function(player){
			if (recentPlayers.indexOf(player) == -1){
				recentPlayers.push(player);
			}
		})
	})
	return allPlayers;
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