import app from '@src/app';
import chai, {expect} from 'chai';
import chaiUuid from 'chai-uuid';
import {agent as request} from 'supertest';
import { makeFakeProductId } from '@src/test/helper/fake-product';

chai.use(chaiUuid);

describe('POST /api/products/:id/unreserve', () => {
  it('should create a product, get a reservation token, unreserve a product, check valid amounts for instock, reserved, sold', async () => {
    let productId: string = makeFakeProductId();
    let stock = {
      stock: 123,
    }
    const res1stCall = await request(app).patch('/api/products/' + productId +'/stock').send(stock);
    expect(res1stCall.status).to.equal(200);
    expect(res1stCall.body).to.be.empty;  
    // before
    const res2ndCall = await request(app).get('/api/products/' + productId);
    expect(res2ndCall.status).to.equal(200);    
    expect(res2ndCall.body.IN_STOCK).to.equal(123);
    expect(res2ndCall.body.RESERVED).to.equal(0);
    expect(res2ndCall.body.SOLD).to.equal(0);

    const res3rdCall = await request(app).post('/api/products/' + productId +'/reserve');
    expect(res3rdCall.status).to.equal(200);
    expect(res3rdCall.body).not.to.be.empty;
    expect(res3rdCall.body.reservationToken).to.be.a.uuid('v4');

    // in between
    const res4thCall = await request(app).get('/api/products/' + productId);
    expect(res4thCall.status).to.equal(200);    
    expect(res4thCall.body.IN_STOCK).to.equal(122);
    expect(res4thCall.body.RESERVED).to.equal(1);
    expect(res4thCall.body.SOLD).to.equal(0);

    const rtoken = {
      reservationToken: res3rdCall.body.reservationToken,
    }
    const res5thCall = await request(app).post('/api/products/' + productId +'/unreserve').send(rtoken);
    expect(res5thCall.status).to.equal(200);
    expect(res5thCall.body).to.be.empty;

    // after
    const res6thCall = await request(app).get('/api/products/' + productId);
    expect(res6thCall.status).to.equal(200);    
    expect(res6thCall.body.IN_STOCK).to.equal(123);
    expect(res6thCall.body.RESERVED).to.equal(0);
    expect(res6thCall.body.SOLD).to.equal(0);
  });
});

describe('POST /api/products/:id/unreserve', () => {
  it('should create a product, get a reservation token, unreserve twice the same product, check valid amounts for instock, reserved, sold', async () => {
    let productId: string = makeFakeProductId();
    let stock = {
      stock: 123,
    }
    const res1stCall = await request(app).patch('/api/products/' + productId +'/stock').send(stock);
    expect(res1stCall.status).to.equal(200);
    expect(res1stCall.body).to.be.empty;  
    // before
    const res2ndCall = await request(app).get('/api/products/' + productId);
    expect(res2ndCall.status).to.equal(200);    
    expect(res2ndCall.body.IN_STOCK).to.equal(123);
    expect(res2ndCall.body.RESERVED).to.equal(0);
    expect(res2ndCall.body.SOLD).to.equal(0);

    const res3rdCall = await request(app).post('/api/products/' + productId +'/reserve');
    expect(res3rdCall.status).to.equal(200);
    expect(res3rdCall.body).not.to.be.empty;
    expect(res3rdCall.body.reservationToken).to.be.a.uuid('v4');

    // in between
    const res4thCall = await request(app).get('/api/products/' + productId);
    expect(res4thCall.status).to.equal(200);    
    expect(res4thCall.body.IN_STOCK).to.equal(122);
    expect(res4thCall.body.RESERVED).to.equal(1);
    expect(res4thCall.body.SOLD).to.equal(0);

    const rtoken = {
      reservationToken: res3rdCall.body.reservationToken,
    }
    const res5thCall = await request(app).post('/api/products/' + productId +'/unreserve').send(rtoken);
    expect(res5thCall.status).to.equal(200);
    expect(res5thCall.body).to.be.empty;

    // after
    const res6thCall = await request(app).get('/api/products/' + productId);
    expect(res6thCall.status).to.equal(200);    
    expect(res6thCall.body.IN_STOCK).to.equal(123);
    expect(res6thCall.body.RESERVED).to.equal(0);
    expect(res6thCall.body.SOLD).to.equal(0);

    const res7thCall = await request(app).post('/api/products/' + productId +'/unreserve').send(rtoken);
    expect(res7thCall.status).to.equal(404);
    expect(res7thCall.body.message).to.be.equal('reservation token not found');
  });
});