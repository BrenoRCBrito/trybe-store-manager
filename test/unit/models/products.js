const { expect } = require('chai');
const connection = require('../../../models/connection');
const ProductModel = require('../../../models/products');
const sinon = require('sinon');
const { describe } = require('mocha');

describe('Product Model Tests:', () => {
  describe('Function getAll:', () => {
    before(async () => {
      sinon.restore();
    });
    it('Must return an array;', async () => {
      const execute = [[]];
      sinon.stub(connection, 'execute').resolves(execute);
      const response = await ProductModel.getAll();
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
            id: 1,
            name: 'Martelo de Thor',
            quantity: 10,
          },
        ],
      ];
      sinon.stub(connection, 'execute').resolves(execute);
      const response = await ProductModel.getById(1);
      expect(response).to.be.a('object');
    });
  });
  describe('Function getByName:', () => {
    before(async () => {
      sinon.restore();
    });
    it('Must return an object;', async () => {
      const execute = [
        [
          {
            id: 1,
            name: 'Martelo de Thor',
            quantity: 10,
          },
        ],
      ];
      sinon.stub(connection, 'execute').resolves(execute);
      const response = await ProductModel.getByName('Martelo de Thor');
      expect(response).to.be.a('object');
    });
  });
  describe('Function create:', () => {
    before(async () => {
      sinon.restore();
    });
    it('Must return an object;', async () => {
      const execute = [
        {
          insertId: 4,
        },
      ];
      sinon.stub(connection, 'execute').resolves(execute);
      const response = await ProductModel.create('Traje do Homem de Ferro', 1);
      expect(response).to.be.a('object');
    });
  });
  describe('Function update:', () => {
    before(async () => {
      sinon.restore();
    });
    it('Must return an object;', async () => {
      sinon.stub(connection, 'execute').resolves();
      const response = await ProductModel.update(1, 'Flechas do Gavião', 20);
      expect(response).to.be.a('object');
    });
  });
  describe('Function destroy:', () => {
    before(async () => {
      sinon.restore();
    });
    it('Must return a boolean;', async () => {
      const execute = [
        {
          affectedRows: 1,
        },
      ];
      sinon.stub(connection, 'execute').resolves(execute);
      const response = await ProductModel.destroy(1);
      expect(response).to.be.a('boolean');
    });
  });
});
