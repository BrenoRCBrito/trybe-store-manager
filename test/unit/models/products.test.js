const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const productsModel = require('../../../models/products');

describe('Read all the products in DB', () => {
  const products = [[
    { id: 1, name: 'Martelo de Thor', quantity: 10 },
    { id: 2, name: 'Traje de encolhimento', quantity: 20 },
    { id: 3, name: 'Escudo do Capitão América', quantity: 30 }
  ]];

  before(async () => {
    const execute = products;
    sinon.stub(connection, 'execute').resolves(execute);
  })

  after(async () => {
    connection.execute.restore();
  });

  it('then returns an array', async () => {
    const response = await productsModel.getAll();
    expect(response).to.be.an('array');
  })

  it('return an array of object', async () => {
    const [destrucProducts] = products; 

    const response = await productsModel.getAll();
    expect(response).to.deep.equal(destrucProducts);
  })
})

describe('Read the products by id in DB', () => {
  const products = [
    { id: 1, name: 'Martelo de Thor', quantity: 10 },
  ];

  const id = 1;

  before(async () => {
    const execute = products;
    sinon.stub(connection, 'execute').resolves(execute);
  })

  after(async () => {
    connection.execute.restore();
  });

  it('then returns an object', async () => {
    const response = await productsModel.getByID(id);
    expect(response).to.be.an('object');
  })

  it('return an object with id, name and quantity keys', async () => {
    const [destrucProducts] = products; 

    const response = await productsModel.getAll();
    expect(response).to.deep.equal(destrucProducts);
  })
})