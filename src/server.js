'use strict';

const express = require('express');
const mysql = require("mysql2");
const multer = require("multer");
const fs = require("fs");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");


const port = process.env.PORT || 1337;
const app = express();

const titleFileDest = process.cwd() + "/dist/KaiserreichWiki/" + "index.html";

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "TO-DO", 
  database: "TO-DO"
});

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, UPLOADS_DIRECTORY);
  },
  filename: (req, file, cb) => {
      cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {

  if (file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg") {
      cb(null, true);
  }
  else {
      cb(null, false);
  }
}

function authenticateToken(req, res, next) {

  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

app.use(multer({ storage: storageConfig, fileFilter: fileFilter }).single("filedata"));

app.use(bodyParser.json());
app.use(express.static(process.cwd() + "/dist/KaiserreichWiki/"));

app.get("**", function (request, response) {

  response.render(titleFileDest);
});

app.post("/article", function (request, response) {

  response.render(titleFileDest);
});

app.post("/photo", function (request, response) {

});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});