const app= require('../src/index');

const expect = require('chai').expect;

const request = require('supertest');

describe('Unit tests for CRUD operations on different end points', () => {

    it('Cannot create a new Quiz without authorization bearer token', (done)=> {
      request(app).post('/api/v1/quizzes')
      .send({
        "title":"Node.js",
       "description":"Following quiz provides Multiple Choice Questions (MCQs) related to Node.js Framework.",
       "category":"Backend",
       "duration":{
           "minutes":20
       }
   })
      .then((res) => {
        const statusCode = res.statusCode;
        expect(statusCode).equal(401);
        done();
      })
      .catch((err) => done(err));
    });
});

describe('unit tests for quiz responses endpoint',()=>{
    it('getting user leaderboard',(done)=>{
        request(app).get('/api/v1/quizResponse/leaderboard')
        .send({})
        .then((res=>{
            const statusCode = res.statusCode;
            expect(statusCode).equal(200);
            expect(res.body).to.contain.property('success').to.equal(true)
        }))
        .catch(done());
    })    
})


describe('unit test for user endpoint',()=>{
    it('login of user',(done)=>{
        request(app).post('/api/v1/user/login')
        .send({   
            "email":"hammad@gmail.com",
         "password":"123123"
        })
        .then((res)=>{
            const statusCode = res.statusCode;
            expect(statusCode).equal(200);
            expect(res.body).to.contain.property('success').to.equal(true)
            done();
      })
      .catch(done);
    })
})

