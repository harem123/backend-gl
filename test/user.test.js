const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const expect = chai.expect;

chai.use(chaiHttp);

  describe('POST /login', () => {
    it('should return token and user id when given email, and password', (done) => {
        chai
          .request(server)
          .post('/api/v1/login')
          .send({ email: 'camilo@gmail.com', password: 'camilo' })
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('token');
            expect(res.body).to.have.property('userId');
            done();
          })
        })
  })

  describe('GET /protectedstats/:id', () => {
    it('should return users stats when a valid token is given', (done) => {
      const id = 1; 
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3OTg0MjAzNCwiZXhwIjoxNjc5ODcwODM0fQ.IWtRx4uoCfbC0uodMxCfRtU2VGnG8YlADwe-rOUuaM0';
  
      chai.request(server)
        .get(`/api/v1/protectedstats/${id}`)
        .set('Authorization', `${token}`)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('countAverage');
          //expect(res.body.stats).to.have.property('count');
          done();
        });
    });
  
    it('should return 401 Unauthorized when Authorization header is missing', (done) => {
      const id = '1'; // Replace with a valid id
  
      chai.request(server)
        .get(`/api/v1/protectedstats/${id}`)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(401);
          done();
        });
    });
  });

  describe('POST /register', () => {
    it('should return the user id when given name, email, and password', (done) => {
        chai
          .request(server)
          .post('/api/v1/register')
          .send({ name: 'John Doe', email: 'johnusdffy86tr@example.com', password: 'password123' })
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(201);
            expect(res.body).to.have.property('insertionId');
            done();
          })
        })
  })