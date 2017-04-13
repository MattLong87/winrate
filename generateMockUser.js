const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const faker = require('faker');


const {PORT, DATABASE_URL} = require('./config');
const {app, runServer, closeServer} = require('./server');
const {User} = require('./models/models');

runServer()
.then(seedUser)
.then(closeServer)
.catch(function(err){
	console.log(err);
});

//to test statistics calculations later, probably
//have to rewrite to be more realistic
function seedUser(){
	var fakeUser = {
		username: faker.internet.userName(),
		name: {
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
		},
		players: [faker.name.firstName(),faker.name.firstName(),faker.name.firstName()],
		sessions: generateSessions(10)
	}

	return User.insertOne(fakeUser);
}

function generateSessions(numSessions){
	let sessions = [];
	for (let i = 1; i <= numSessions; i++){
		let session = {
			game: faker.commerce.productName(),
			players: [faker.name.firstName(), faker.name.firstName()],
			winner: faker.name.firstName(),
			timeStamp: Date.now()
		}
		sessions.push(session);
	}
	return sessions;
}