require('dotenv').config()
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT

app.use(cors());
app.use(express.json());

const user = require("./Router/user");

app.use("/user", user);

app.listen(port, () => {
  console.log(`connected localhost:${port}`);
});;