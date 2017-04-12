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
				res.should.be.html
			})
	})

})