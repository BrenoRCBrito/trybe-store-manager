const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const salesModel = require('../../../models/sales');
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

describe('Read the sales in DB', () => {

  

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

  before(async () => {
    const execute = sales;
    sinon.stub(connection, 'execute').resolves(execute);
  })

  after(async () => {
    connection.execute.restore();
  });

  it('then returns an array', async () => {
    const response = await salesModel.getAll();
    console.log(response);
    expect(response).to.be.an('array');
  })

  it('return an array of object', async () => {
    const [destrucSales] = sales; 

    const response = await salesModel.getAll();
    expect(response).to.deep.equal(destrucSales.map(serialize));
  })
})

describe('Read the products by id in DB', () => {
  const sales = [
    [
      { date: '2022-03-03T11:14:19.000Z', product_id: 1, quantity: 5 },
      { date: '2022-03-03T11:14:19.000Z', product_id: 2, quantity: 10 }
    ],
  ];

  const id = 1;

  before(async () => {
    const execute = sales;
    sinon.stub(connection, 'execute').resolves(execute);
  })

  after(async () => {
    connection.execute.restore();
  });

  it('then returns an array', async () => {
    const response = await salesModel.getByID(id);
    expect(response).to.be.an('array');
  })

  it('return an array of objects', async () => {
    const [destrucSales] = sales; 

    const response = await salesModel.getAll();
    expect(response).to.deep.equal(destrucSales.map(serialize));
  })
})