const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cors = require("cors");
dotenv.config();

const app = express();
app.use(cors());
const port = process.env.PORT || 8081;
routes(app);
mongoose
  .connect(`${process.env.MONGO_DB}`)
  .then(() => {
    console.log("Connect Db success!");
  })
  .catch((e) => {
    console.log("Error", e);
  });
const allowCrossDomain = (req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE,OPTIONS`);
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type");
  next();
};
app.use(allowCrossDomain);
app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});
