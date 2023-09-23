const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");
dotenv.config();

const app = express();
const port = process.env.PORT || 8081;
app.use(bodyParser.json())
routes(app)
mongoose
  .connect(`${process.env.MONGO_DB}`)
  .then(() => {
    console.log("Connect Db success!");
  })
  .catch((e) => {
    console.log("Error", e);
  });
app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});
