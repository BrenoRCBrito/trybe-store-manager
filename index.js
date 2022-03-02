const express = require('express');
const error = require('./middlewares/error');
const notFound = require('./middlewares/notFound');
const productsController = require('./controllers/products');
const salesController = require('./controllers/sales');

require('dotenv').config();

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsController);

app.use('/sales', salesController);

app.use('*', notFound);

app.use(error);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
