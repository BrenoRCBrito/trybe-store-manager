const { expect } = require('chai');
const SaleService = require('../../../services/sales');
const SaleModel = require('../../../models/sales');
const sinon = require('sinon');
const { describe } = require('mocha');

describe('Sale Service Tests:', () => {
  describe('Function getAll:', () => {
    before(async () => {
      sinon.restore();
    });
    it('Must return an array;', async () => {
      sinon.stub(SaleModel, 'getAll').resolves([]);
      const response = await SaleService.getAll();
      expect(response).to.be.a('array');
    });
  });
  describe('Function getById:', () => {
    before(async () => {
      sinon.restore();
    });
    it('Must return an object;', async () => {
      sinon.stub(SaleModel, 'getById').resolves([]);
      const response = await SaleService.getById(1);
      expect(response).to.be.a('array');
    });
  });
  describe('Function create:', () => {
    before(async () => {
      sinon.restore();
    });
    it('Must return an object;', async () => {
      sinon.stub(SaleModel, 'create').resolves({});
      const response = await SaleService.create('Traje do Homem de Ferro', 1);
      expect(response).to.be.a('object');
    });
  });
  describe('Function update:', () => {
    before(async () => {
      sinon.restore();
    });
    it('Must return an object;', async () => {
      sinon.stub(SaleModel, 'update').resolves({});
      const response = await SaleService.update(1, 'Flechas do Gavião', 20);
      expect(response).to.be.a('object');
    });
  });
  describe('Function destroy:', () => {
    before(async () => {
      sinon.restore();
    });
    it('Must return a boolean;', async () => {
      sinon.stub(SaleModel, 'destroy').resolves(true);
      const response = await SaleService.destroy(1);
      expect(response).to.be.a('boolean');
    });
  });
});
