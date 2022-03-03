const { expect } = require('chai');
const sinon = require('sinon')
const connection = require('../../../models/connection');
const productsModel = require('../../../models/products');
const productsServices = require('../../../services/products')
const get = require('../../../middlewares/products/get');

describe('returns an empty array if no products', () => {

  const response = {};
  const request = {};

  const products = [[]];

  before(async () => {
    request.body = {};

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    const execute = products;
    sinon.stub(connection, 'execute').resolves(execute);

    sinon.stub(productsServices, 'getAll').resolves([]);
  })

  after(async () => {
    connection.execute.restore();
    productsServices.getAll.restore();
  });

  it('then returns status 200', async () => {
    await get.all(request, response);
    expect(response.status.calledWith(200)).to.be.equal(true);
  })

  it('return an array', async () => {
    await get.all(request, response);

    expect(response.json.calledWith([])).to.be.equal(true);
  })
})

describe('Get and returns all products', () => {

  const response = {};
  const request = {};

  const products = [[
    { id: 1, name: 'Martelo de Thor', quantity: 10 },
    { id: 2, name: 'Traje de encolhimento', quantity: 20 },
    { id: 3, name: 'Escudo do Capitão América', quantity: 30 }
  ]];
  const [destrucProducts] = products; 


  before(async () => {
    request.body = {};

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    const execute = products;
    sinon.stub(connection, 'execute').resolves(execute);

    sinon.stub(productsServices, 'getAll').resolves(destrucProducts);
  })

  after(async () => {
    connection.execute.restore();
    productsServices.getAll.restore();
  });

  it('then returns status 200', async () => {
    await get.all(request, response);
    expect(response.status.calledWith(200)).to.be.equal(true);
  })

  it('return an array', async () => {
    await get.all(request, response);

    expect(response.json.calledWith(destrucProducts)).to.be.equal(true);
  })
})

describe('Get and return a products by id', () => {

  const response = {};
  const request = {};
  const id = 1;

  const products = [
    { id: 1, name: 'Martelo de Thor', quantity: 10 },
  ];
  const [destrucProducts] = products; 


  before(async () => {
    request.body = {};
    request.params = {id};
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    const execute = products;
    sinon.stub(connection, 'execute').resolves(execute);

    sinon.stub(productsServices, 'getByID').resolves(destrucProducts);
  })

  after(async () => {
    connection.execute.restore();
    productsServices.getByID.restore();
  });

  it('then returns status 200', async () => {
    await get.byId(request, response);
    expect(response.status.calledWith(200)).to.be.equal(true);
  })

  it('return an array', async () => {
    await get.byId(request, response);

    expect(response.json.calledWith(destrucProducts)).to.be.equal(true);
  })
})

describe('If no product with id, returns error', () => {

  const response = {};
  const request = {};
  const id = 10;

  const products = [];
  const [destrucProducts] = products; 


  before(async () => {
    request.body = {};
    request.params = {id};
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    const execute = products;
    sinon.stub(connection, 'execute').resolves(execute);

    sinon.stub(productsServices, 'getByID').resolves(destrucProducts);
  })

  after(async () => {
    connection.execute.restore();
    productsServices.getByID.restore();
  });

  it('then returns status 200', async () => {
    await get.byId(request, response);
    expect(response.status.calledWith(404)).to.be.equal(true);
  })

  it('return an array', async () => {
    await get.byId(request, response);

    expect(response.json.calledWith({message: 'Product not found'})).to.be.equal(true);
  })
})