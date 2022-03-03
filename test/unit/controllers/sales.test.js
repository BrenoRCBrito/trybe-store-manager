const { expect } = require('chai');
const sinon = require('sinon')
const connection = require('../../../models/connection');
const salesServices = require('../../../services/sales')
const get = require('../../../middlewares/sales/get');

const serialize = (sales) => {
  if (sales.sale_id) {
 return { saleId: sales.sale_id,
    productId: sales.product_id,
    date: sales.date,
    quantity: sales.quantity }; 
}
  return {
    productId: sales.product_id,
    date: sales.date,
    quantity: sales.quantity,
  };
};

describe('returns an empty array if no sales', () => {

  const response = {};
  const request = {};

  const sales = [[]];

  before(async () => {
    request.body = {};

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    const execute = sales;
    sinon.stub(connection, 'execute').resolves(execute);

    sinon.stub(salesServices, 'getAll').resolves([]);
  })

  after(async () => {
    connection.execute.restore();
    salesServices.getAll.restore();
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

describe('Get and returns all sales', () => {

  const response = {};
  const request = {};

  const sales = [[
    {
      date: '2022-03-03T11:03:24.000Z',
      sale_id: 1,
      product_id: 1,
      quantity: 5
    },
    {
      date: '2022-03-03T11:03:24.000Z',
      sale_id: 1,
      product_id: 2,
      quantity: 10
    },
    {
      date: '2022-03-03T11:03:24.000Z',
      sale_id: 2,
      product_id: 3,
      quantity: 15
    }
  ]];
  const [destrucSales] = sales; 


  before(async () => {
    request.body = {};

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    const execute = sales;
    sinon.stub(connection, 'execute').resolves(execute);

    sinon.stub(salesServices, 'getAll').resolves(destrucSales.map(serialize));
  })

  after(async () => {
    connection.execute.restore();
    salesServices.getAll.restore();
  });

  it('then returns status 200', async () => {
    await get.all(request, response);
    expect(response.status.calledWith(200)).to.be.equal(true);
  })

  it('return an array', async () => {
    await get.all(request, response);

    expect(response.json.calledWith(destrucSales.map(serialize))).to.be.equal(true);
  })
})