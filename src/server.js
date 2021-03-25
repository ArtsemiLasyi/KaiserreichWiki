'use strict';

const SALT_LENGTH = 12;

const express = require('express');
const multer = require("multer");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')
const log4js = require("log4js");
const account = require("../src/modules/account/account");


const port = process.env.PORT || 1337;
const app = express();

const titleFileDest = process.cwd() + "/dist/KaiserreichWiki/" + "index.html";

const jsonParser = express.json();

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

app.post("/account", jsonParser, async function (request, response) {

    if(!request.body) {
        response.sendStatus(400).json({message : "Empty body"});
    }

    const {email, password, login} = request.body.data;
    const isAccountAlreadyExist = await account.isAccountAlreadyExist(email, login);
    if (isAccountAlreadyExist) {
        return response.status(400).json({message: "Account with this email is already exists!"})
    }
    
    const hashedPassword = await bcrypt.hash(password, SALT_LENGTH)
    const getAccount = await account.createNewAccount(login, email, hashedPassword);
    // const token = jwt.sign(
    //     { userId: getAccount },
    //     fs.readFileSync("jwt_config/config", "utf-8"),
    //     { algorithm: 'RS256', expiresIn: '1h' },
    // )
    
    response.redirect("http://localhost:1337/").json({userId: getAccount, message : "Account created successfully!"});
});

app.put("/account/:id", function (request, response) {

    if(!request.body) {
        response.sendStatus(400);
    }

    const {email, password, login} = request.body.data;

}) 



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