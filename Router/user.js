const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const knex = require("../config/dbconnection");
const { createToken, virifiToken } = require("../middelwear/jwt");

router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    if (req.body.username != undefined && req.body.username != "") {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      await knex("user").insert(req.body);
      res.send("Data Inserted");
    }
  } catch (error) {
    console.log(error);
    res.send("somthing want wrong");
  }
});

router.post("/login", async (req, res) => {
  try {
    let data = await knex("user").where({ email: req.body.email });
    if (data[0].username != undefined) {
      let check = await bcrypt.compare(req.body.password, data[0].password);
      if (check) {
        let cookie = createToken(data[0]);
        // res.cookie("addcookie",cookie);
        res.send({ token: cookie, userdata: data[0] });
      }
    }
  } catch (error) {
    res.send("somthing went wrong");
  }
});

router.get("/auth", virifiToken, async (req, res) => {
  res.send(req.userData)
});

module.exports = router;
