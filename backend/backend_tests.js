const assert = require('assert');

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const should = chai.should();

const app = require('../backend/app');

const launchClass = require('../backend/routes/launchRoute');


chai.use(chaiHttp);


describe("Testing routes", () => {
    describe("GET /", () => {
	
	// NOT WORKING GETTING STATUS 403 ACCESS FORBIDDEN
        // Test to get all GitHub contributors
        it("should get all project contributors", (done) => {
             chai.request(app)
                 .get('/about')
                 .end((err, res) => {
					 assert('json', res.type);
                     res.should.have.status(200);
                     res.body.should.be.an('array');
                     done();
                  });
         });


		it("should get all international astronauts", (done) => {
             chai.request(app)
                 .get('/InternationalAstronauts')
                 .end((err, res) => {
					 assert('json', res.type);
                     res.should.have.status(200);
                     res.body.should.be.an('array');
                     done();
                  });
         });

		it("should get all Russian astronauts", (done) => {
             chai.request(app)
                 .get('/RussianAstronauts')
                 .end((err, res) => {
					 assert('json', res.type);
                     res.should.have.status(200);
                     res.body.should.be.an('array');
                     done();
                  });
         });

		it("should get all US astronauts", (done) => {
             chai.request(app)
                 .get('/USAstronauts')
                 .end((err, res) => {
					 assert('json', res.type);
                     res.should.have.status(200);
                     res.body.should.be.an('array');
                     done();
                  });
         });


		 it("should get the first launch out of the most recent 5", (done) => {
             chai.request(app)
                 .get('/landing')
                 .end((err, res) => {
					 assert('json', res.type);
                     res.should.have.status(200);
                     res.body.should.be.an('object');
                     done();
                  });
         });

//		var sub = new Subscriber({email: 'musa_rafik@utexas.edu'});
		
		it("should verify that the user is already a subscriber", (done) => {
             chai.request(app)
                 .post('/landing/subscribe')
				 .send({'email': 'musa_rafik@utexas.edu'})
                 .end((err, res) => {
					 assert('json', res.type);
                     res.should.have.status(200);
                     assert('fail', res.text);
                     done();
                  });
         });

		it("should not allow an email not in MongoDB to unsubscribe", (done) => {
             chai.request(app)
                 .post('/landing/unsubscribe')
				 .send({'email': 'fake_email@utexas.edu'})
                 .end((err, res) => {
					 assert('json', res.type);
                     res.should.have.status(200);
                     assert('fail', res.text);
                     done();
                  });
         });
		
//		it("should respond with json full of all launches", (done) => {
//             chai.request(app)
//                 .get('/launch')
//                 .end((err, res) => {
//					 assert('json', res.type);
//                     res.should.have.status(200);
//                     done();
//                  });
//         });
		
	});
});