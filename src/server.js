'use strict';

const SALT_LENGTH = 12;

const express = require('express');
const multer = require("multer");
const config = require('config');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')
const log4js = require("log4js");


const port = process.env.PORT || config.get("port");
const app = express();

const titleFileDest = process.cwd() + "/dist/KaiserreichWiki/" + "index.html";

const jsonParser = express.json();

app.use("/account", require("../src/modules/routes/authorization/authorization"));

app.use("/photo", require("../src/modules/routes/photo/photo"))

app.use(express.static(process.cwd() + "/dist/KaiserreichWiki/"));

app.use(express.urlencoded());

app.use( function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS");
    next();
  });

app.get("/admin", function (request, response) {

    response.sendStatus(403);
});

app.get("**", function (request, response) {
  try {
      response.sendFile(titleFileDest);
  } catch(ex) {
      response.sendStatus(501).json({message: "Server error"});
  }
});


app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});
