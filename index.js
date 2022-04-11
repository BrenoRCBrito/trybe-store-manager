const express = require("express");
const error = require("./middlewares/error");
const notFound = require("./middlewares/notFound");
const productsRouter = require("./routes/products");
const salesRouter = require("./routes/sales");

require("dotenv").config();

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get("/", (_request, response) => {
  response.send();
});

app.use("/products", productsRouter);

app.use("/sales", salesRouter);

app.use("*", notFound);

app.use(error);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
