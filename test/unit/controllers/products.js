const { expect } = require('chai');
const sinon = require('sinon');
const { describe } = require('mocha');
const ProductService = require('../../../services/products');
const ProductController = require('../../../controllers/products');

describe('Products Controller:', () => {
  const request = {};
  const response = {};
  describe('Function getAll:', () => {
    before(() => {
      sinon.restore();
      request.body = {};
    });
    it('Must return status 200', async () => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(ProductService, 'getAll').resolves([]);
      await ProductController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });
});
