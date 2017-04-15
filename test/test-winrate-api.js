const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const should = chai.should();
const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');
const {seedUser} = require('../generateMockUser');

chai.use(chaiHttp);

//Functions to populate test database before each test and drop it after each

function tearDownDb() {
    console.warn('Deleting database');
    return mongoose.connection.dropDatabase();
}



describe("Root URL", function(){
	it("Should return a 200 status and HMTL", function(){
		return chai.request(app)
			.get('/')
			.then(function(res){
				res.should.have.status(200);
				res.should.be.html;
			})
	})

})

describe("Dashboard page", function(){
	it("Should return a 200 status and HMTL", function(){
		return chai.request(app)
			.get('/dashboard.html')
			.then(function(res){
				res.should.have.status(200);
				res.should.be.hmtl;
			})
	})
})

describe("Add-Session page", function(){
	it("Should return a 200 status and HMTL", function(){
		return chai.request(app)
			.get('/add-session.html')
			.then(function(res){
				res.should.have.status(200);
				res.should.be.hmtl;
			})
	})
})

describe("Sessions page", function(){
	it("Should return a 200 status and HMTL", function(){
		return chai.request(app)
			.get('/sessions.html')
			.then(function(res){
				res.should.have.status(200);
				res.should.be.hmtl;
			})
	})
})

describe("Winrate API resource", function(){
	before(function() {
    return runServer(TEST_DATABASE_URL);	
  });

  beforeEach(function() {
    return seedUser().then(user => {testUser = user;});
  });

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  })

	describe("Dashboard API endpoint", function(){
		it("Should return information for the dashboard and 4 most recent sessions", function(){
			let keys = ["username", "myFirstName", "recentPlayers", "recentSessions"];
			let sessionKeys = ["game", "players", "winner", "timeStamp"];
			console.log("created");
			console.log(testUser);
			return chai.request(app)
				.get('/api/dashboardInfo')
				.then(function(res){
					res.should.have.status(200);
					res.should.be.json;
					res.body.should.be.a("object");
					res.body.username.should.be.a("string");
					res.body.overallWinrate.should.be.a("number");
					res.body.recentSessions.should.have.length.of(4);
					res.body.should.contain.all.keys(keys);
					res.body.recentSessions.forEach(function(session){
						session.should.be.a("object");
						session.should.contain.all.keys(sessionKeys);
						session.game.should.be.a("string");
						session.players.should.be.a("array");
						session.players.should.have.length.of.at.least(2);
						session.winner.should.be.a("string");
					})
				})
		})
	})

	describe("AllSessions API endpoint", function(){
		it("Should return player information and all sessions", function(){
			return chai.request(app)
				.get('/api/allSessions')
				.then(function(res){
					res.should.have.status(200);
					res.should.be.json;
					res.body.should.be.a("object");
					res.body.username.should.be.a("string");
					res.body.myFirstName.should.be.a("string");
					res.body.sessions.should.be.a("array");
					res.body.sessions.length.should.be.at.least(1);
					res.body.sessions.forEach(function(session){
						session.should.be.a("object");
						session.game.should.be.a("string");
						session.players.should.be.a("array");
						session.players.should.have.length.of.at.least(2);
						session.winner.should.be.a("string");
					})
				})
		})
	})

	describe("History API endpoint", function(){
		it("Should return player's games played and unique names in all sessions", function(){
			return chai.request(app)
				.get('/api/history')
				.then(function(res){
					res.should.have.status(200);
					res.should.be.json;
					res.body.should.be.a("object");
					res.body.username.should.be.a("string");
					res.body.allGames.should.be.a("array");
					res.body.allPlayers.should.be.a("array");
				})
		})
	})
})