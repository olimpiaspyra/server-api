const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Concert = require('../../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {

  before(async () => {
    const testConOne = new Concert({
      _id: '5d9f1140f10a81216cfd4408', 
      performer: 'Mike Rose',
      genre: 'Rock',
      price: 25,
      day: 2,
      image: 'test.png',
    });

    await testConOne.save();

    const testConTwo = new Concert({
      _id: '5d9f1159f81ce8d1ef2bee48',
      performer: 'Jack Sparrow',
      genre: 'Pop',
      price: 50,
      day: 1,
      image: 'test2.png',
    });

    await testConTwo.save();

  });

  after(async () => {
    await Concert.deleteMany();
  });

  it('/ should return all concerts', async () => {

    const res = await request(server).get('/api/concerts');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);

  });

  it('/:id should return one concert by :id ', async () => {
    const res = await request(server).get('/api/concerts/5d9f1140f10a81216cfd4408');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.null;
  });

  it('/:performer should return one concert by performer ', async () => {
    const res = await request(server).get('/api/concerts/performer/Mike Doe');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.not.be.null;
  });

  it('/:genre should return one concert by genre ', async () => {
    const res = await request(server).get('/api/concerts/genre/dance');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.not.be.null;
  });

  it('/:price should return one concert by price ', async () => {    

    const res = await request(server).get('/api/concerts/price/25/50');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });

  it('/:day should return one concert by day ', async () => {
    
    const res = await request(server).get('/api/concerts/price/day/2');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.not.be.null;
  });

})