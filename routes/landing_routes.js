const express = require("express");
const router = express.Router();
const authenticate_session = require("../public/authenticate_session.js");
const bcrypt = require("bcrypt");
const passport = require("passport");
const mysql = require("mysql");
const fetch = require("../database/fetch_data.js");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "$111299sk",
  database: "db",
  multipleStatements: true,
});

router.get("/contact_us", function (req, res) {
  res.render("contact_us1.ejs");
});

router.get("/", authenticate_session.checkAuthenticated, function (req, res) {
  res.render("home.ejs", { flag: 0 });
});

router.get("/login", authenticate_session.checkNotAuthenticated, (req, res) => {
  res.render("login.ejs");
});

router.post(
  "/login",
  authenticate_session.checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

router.get(
  "/register",
  authenticate_session.checkNotAuthenticated,
  function (req, res) {
    res.render("register.ejs");
  }
);

router.post(
  "/register",
  authenticate_session.checkNotAuthenticated,
  async (req, res) => {
    //connection.connect()
    try {
      const id = Date.now().toString();
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const sql =
        "insert into profile_info values('" +
        req.body.email +
        "','" +
        req.body.first_name +
        "','" +
        req.body.last_name +
        "','" +
        req.body.dob +
        "','" +
        req.body.contact +
        "','" +
        req.body.gender +
        "','" +
        req.body.address +
        "','" +
        req.body.city +
        "','" +
        req.body.zip +
        "','" +
        id +
        "')";
      const sql1 =
        "insert into profile_login values('" +
        req.body.username +
        "','" +
        req.body.email +
        "','" +
        hashedPassword +
        "','" +
        id +
        "')";

      connection.query(sql1, function (err) {
        if (err) throw err;
        connection.query(sql, function (err) {
          fetch.populate_seller_buyer(req);
          console.log("Successfully saved");
        });
      });
      res.redirect("/login");
    } catch {
      res.redirect("/register");
    }
    //connection.end()
  }
);

module.exports = router;