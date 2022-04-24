const { expect } = require('chai');
const ProductService = require('../../../services/products');
const ProductModel = require('../../../models/products');
const sinon = require('sinon');
const { describe } = require('mocha');

describe('Product Service Tests:', () => {
  describe('Function getAll:', () => {
    before(async () => {
      sinon.restore();
    });
    it('Must return an array;', async () => {
      sinon.stub(ProductModel, 'getAll').resolves([]);
      const response = await ProductService.getAll();
      expect(response).to.be.a('array');
    });
  });
  describe('Function getById:', () => {
    before(async () => {
      sinon.restore();
    });
    it('Must return an object;', async () => {
      sinon.stub(ProductModel, 'getById').resolves({});
      const response = await ProductService.getById(1);
      expect(response).to.be.a('object');
    });
  });
  describe('Function getByName:', () => {
    before(async () => {
      sinon.restore();
    });
    it('Must return an object;', async () => {
      sinon.stub(ProductModel, 'getByName').resolves({});
      const response = await ProductService.getByName('Martelo de Thor');
      expect(response).to.be.a('object');
    });
  });
  describe('Function create:', () => {
    before(async () => {
      sinon.restore();
    });
    it('Must return an object;', async () => {
      sinon.stub(ProductModel, 'create').resolves({});
      const response = await ProductService.create(
        'Traje do Homem de Ferro',
        1
      );
      expect(response).to.be.a('object');
    });
  });
  describe('Function update:', () => {
    before(async () => {
      sinon.restore();
    });
    it('Must return an object;', async () => {
      sinon.stub(ProductModel, 'update').resolves({});
      const response = await ProductService.update(1, 'Flechas do Gavião', 20);
      expect(response).to.be.a('object');
    });
  });
  describe('Function destroy:', () => {
    before(async () => {
      sinon.restore();
    });
    it('Must return a boolean;', async () => {
      sinon.stub(ProductModel, 'destroy').resolves(true);
      const response = await ProductService.destroy(1);
      expect(response).to.be.a('boolean');
    });
  });
});
