'use strict';
const supertest = require('supertest');
const server = require('../src/server');
const request = supertest(server.app);


describe('bad method/request', () => {
  it('Handles bad route', async () => {
    const response = await request.get('/hello');
    expect(response.status).toEqual(404);
  });
  it('Handles bad method', async () => {
    const response = await request.post('/foods');
    expect(response.status).toEqual(404);
  });
});
describe('The correct status codes and returned data for each REST route', () => {
  let id;
  test('post method test', async () => {
    const body = {
      name: 'apple',
      price: '30',
    };
    let result = await request.post('/api/v1/foods').send(body);
    expect(result.statusCode).toEqual(200);
    expect(result.body.data.name).toBe(body.name);
    expect(result.body.data.price).toBe(body.price);
  });
  test('Read a list of records using GET', async () => {
    const body1 = {
      name: 'apple1',
      price: '30',
    };
    const body2 = {
      name: 'apple2',
      price: '30',
    };
    await request.post('/api/v1/foods').send(body1);
    let result2 = await request.post('/api/v1/foods').send(body2);
    id = result2.body.id;
    let result = await request.get('/api/v1/foods');
    expect(result.body.length).toBe(3);
  });
  test('Read a record using GET', async () => {
    let result3 = await request.get('/api/v1/foods/' + id);
    console.log(result3.body);
    expect(result3.status).toEqual(200);
    expect(result3.body.data.name).toBe('apple2');
  });
  test('Update a record using PUT', async () => {
    let result4 = await request.put('/api/v1/foods/' + id).send({ name: 'modified', price: '50' });
    expect(result4.body.data.name).toEqual('modified');
  });
  test('Destroy a record using DELETE', async () => {
    let result5 = await request.delete('/api/v1/foods/' + id);
    expect(result5.body).toEqual('');
  });
});