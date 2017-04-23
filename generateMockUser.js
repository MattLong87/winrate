//This script generates realistic data for one user and inserts
//it into the database. User has 20 friends and has played 5 games
//over 20 sessions

const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const faker = require('faker');
const moment = require('moment');

const {PORT, DATABASE_URL} = require('./config');
const {app, runServer, closeServer} = require('./server');
const {User} = require('./models/models');

runServer()
.then(seedUser)
.then(closeServer)
.catch(function(err){
	console.log(err);
});

function choosePlayers(numPlayers, playerNames){
  //copies playerNames instead of just passing reference
  let playerOptions = playerNames.slice(0)
	let players = [];
	for(var i = 1; i <= numPlayers; i++){
		let playerIndex = Math.floor(Math.random() * playerOptions.length);
		players.push(playerOptions[playerIndex]);
		playerOptions.splice(playerIndex, 1);
	}
	return players;
}

function seedUser(){
	const userFirstName = faker.name.firstName();
	var playerHistory = [];
	for(let i = 1; i <= 10; i++){
		playerHistory.push(faker.name.firstName());
	}
	var fakeUser = {
		username: faker.internet.userName(),
		name: {
			firstName: userFirstName,
			lastName: faker.name.lastName(),
		},
		players: playerHistory,
		sessions: generateSessions(30, userFirstName, playerHistory)
	}
	return User.create(fakeUser);
}

let games = []
for (let i = 1; i <= 5; i++){
	games.push(faker.commerce.productName());
}

function generateSessions(numSessions, userFirstName, playerHistory){
	let sessions = [];
	for (let i = 1; i <= numSessions; i++){
		//first argument generates random numPlayers [1, 5]
		let players = choosePlayers(Math.floor(Math.random()*5) + 2, playerHistory);
		//then unshift userFirstName onto players
		players.unshift(userFirstName);
		let winner = players[Math.floor(Math.random() * players.length)];
		let timeStamp = moment().subtract(i, 'days');
		let session = {
			game: games[Math.floor(Math.random() * games.length)],
			players: players,
			winner: winner,
			timeStamp: timeStamp
		}
		sessions.push(session);
	}
	return sessions;
}

module.exports = {seedUser};