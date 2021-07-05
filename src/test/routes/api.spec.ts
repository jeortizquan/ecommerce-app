import app from '@src/app';
import chai, {expect} from 'chai';
import chaiUuid from 'chai-uuid';
import {agent as request} from 'supertest';
import { makeFakeProductId } from '@src/test/helper/fake-product';

chai.use(chaiUuid);

describe('GET /health', () => {
	it('should return 200 if server is healthy', async () => {
		const res = await request(app).get('/health');
    expect(res.status).to.equal(200);
		expect(res.body.status).to.equal('OK');
		expect(res.body.uptime).to.be.greaterThan(0);
	});
});

describe('GET /api/products', () => {
  it('should return an array with all the products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).to.equal(200);
    expect(res.body).not.to.be.empty;  
    expect(res.body).to.be.an("array");
  });
});

describe('PATCH /api/products/:id/stock', () => {
  it('should update the stock of a product and create it if doesn\'t exists', async () => {
    let productId: string = makeFakeProductId();
    let stock = {
      stock: 123,
    }
    const res = await request(app).patch('/api/products/' + productId +'/stock').send(stock);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.empty;  
  });
});

describe('POST /api/products/:id/reserve', () => {  
  it('should reserve one product and get a reservation token', async () => {    
    let productId: string = makeFakeProductId();
    let stock = {
      stock: 123,
    }
    const res1stCall = await request(app).patch('/api/products/' + productId +'/stock').send(stock);
    expect(res1stCall.status).to.equal(200);
    expect(res1stCall.body).to.be.empty;  
    const res2ndCall = await request(app).post('/api/products/' + productId +'/reserve');
    expect(res2ndCall.status).to.equal(200);
    expect(res2ndCall.body).not.to.be.empty;
    expect(res2ndCall.body.reservationToken).to.be.a.uuid('v4');
  });
});

describe('POST /api/products/:id/unreserve', () => {
  it('should unreserve one product with the reservation token', async () => {
    let productId: string = makeFakeProductId();
    let stock = {
      stock: 123,
    }
    const res1stCall = await request(app).patch('/api/products/' + productId +'/stock').send(stock);
    expect(res1stCall.status).to.equal(200);
    expect(res1stCall.body).to.be.empty;  
    const res2ndCall = await request(app).post('/api/products/' + productId +'/reserve');
    expect(res2ndCall.status).to.equal(200);
    expect(res2ndCall.body).not.to.be.empty;
    expect(res2ndCall.body.reservationToken).to.be.a.uuid('v4');
    
    const rtoken = {
      reservationToken: res2ndCall.body.reservationToken,
    }
    const res3rdCall = await request(app).post('/api/products/' + productId +'/unreserve').send(rtoken);
    expect(res3rdCall.status).to.equal(200);
    expect(res3rdCall.body).to.be.empty;
  });
});

describe('POST /api/products/:id/sold', () => {
  it('should sell one product with the reservation token', async () => {
    let productId: string = makeFakeProductId();
    let stock = {
      stock: 123,
    }
    const res1stCall = await request(app).patch('/api/products/' + productId +'/stock').send(stock);
    expect(res1stCall.status).to.equal(200);
    expect(res1stCall.body).to.be.empty;  
    const res2ndCall = await request(app).post('/api/products/' + productId +'/reserve');
    expect(res2ndCall.status).to.equal(200);
    expect(res2ndCall.body).not.to.be.empty;
    expect(res2ndCall.body.reservationToken).to.be.a.uuid('v4');
    
    const rtoken = {
      reservationToken: res2ndCall.body.reservationToken,
    }
    const res3rdCall = await request(app).post('/api/products/' + productId +'/sold').send(rtoken);
    expect(res3rdCall.status).to.equal(200);
    expect(res3rdCall.body).to.be.empty;
  });
});