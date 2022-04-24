const { expect } = require('chai');
const connection = require('../../../models/connection');
const SalesModel = require('../../../models/sales');
const sinon = require('sinon');
const { describe } = require('mocha');

describe('Sale Model Tests:', () => {
  describe('Function getAll:', () => {
    before(async () => {
      sinon.restore();
    });
    it('Must return an array;', async () => {
      const execute = [[]];
      sinon.stub(connection, 'execute').resolves(execute);
      const response = await SalesModel.getAll();
      expect(response).to.be.a('array');
    });
  });
  describe('Function getById:', () => {
    before(async () => {
      sinon.restore();
    });
    it('Must return an object;', async () => {
      const execute = [
        [
          {
            date: '2021-09-09T04:54:29.000Z',
            productId: 1,
            quantity: 2,
          },
          {
            date: '2021-09-09T04:54:54.000Z',
            productId: 2,
            quantity: 2,
          },
        ],
      ];
      sinon.stub(connection, 'execute').resolves(execute);
      const response = await SalesModel.getById(1);
      expect(response).to.be.a('array');
    });
  });
  describe('Function create:', () => {
    before(async () => {
      sinon.restore();
    });
    it('Must return an object;', async () => {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
      const response = await SalesModel.create([
        {
          productId: 1,
          quantity: 3,
        },
      ]);
      expect(response).to.be.a('object');
    });
  });
  describe('Function update:', () => {
    before(async () => {
      sinon.restore();
    });
    it('Must return an object;', async () => {
      sinon.stub(connection, 'execute').resolves();
      const response = await SalesModel.update(1, 'Flechas do Gavião', 20);
      expect(response).to.be.a('object');
    });
  });
  describe('Function destroy:', () => {
    before(async () => {
      sinon.restore();
    });
    it('Must return a boolean;', async () => {
      sinon
        .stub(connection, 'execute')
        .onFirstCall()
        .resolves([
          [
            {
              saleId: 1,
              product_id: 1,
              quantity: 2,
            },
          ],
        ])
        .onSecondCall()
        .resolves()
        .onThirdCall()
        .resolves([{ affectedRows: 1 }]);

      const response = await SalesModel.destroy(1);
      expect(response).to.be.a('boolean');
    });
  });
});
