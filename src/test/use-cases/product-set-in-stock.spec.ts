import app from '@src/app';
import {expect} from 'chai';
import {agent as request} from 'supertest';
import { makeFakeProductId } from '@src/test/helper/fake-product';

describe('PATCH /api/products/:id/stock', () => {
  it('should set the stock of a product, create it if doesn\'t exists, and has a valid stock amount', async () => {
    let productId: string = makeFakeProductId();
    let stock = {
      stock: 123,
    }
    const res1stCall = await request(app).patch('/api/products/' + productId +'/stock').send(stock);
    expect(res1stCall.status).to.equal(200);
    expect(res1stCall.body).to.be.empty;  

    const res2ndCall = await request(app).get('/api/products/' + productId);
    expect(res2ndCall.status).to.equal(200);    
    expect(res2ndCall.body.IN_STOCK).to.equal(123);
  });
});