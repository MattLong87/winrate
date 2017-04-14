const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
const {app} = require('../server');

chai.use(chaiHttp);

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

describe("Dashboard API endpoint", function(){
	it("Should return information for the dashboard and 4 most recent sessions", function(){
		let keys = ["username", "myFirstName", "recentPlayers", "sessions"];
		let sessionKeys = ["game", "players", "winner", "timeStamp"];
		return chai.request(app)
			.get('/api/dashboardInfo')
			.then(function(res){
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a("object");
				res.body.sessions.should.have.length.of(4);
				res.body.should.have.all.keys(keys);
				res.body.sessions.forEach(function(session){
					session.should.be.a("object");
					session.should.have.all.keys(sessionKeys);
					//add checks for each session field
				})
			})
	})
})