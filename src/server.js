'use strict';

const express = require('express');
const multer = require("multer");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')
const log4js = require("log4js");



const port = process.env.PORT || 1337;
const app = express();

const titleFileDest = process.cwd() + "/dist/KaiserreichWiki/" + "index.html";

const jsonParser = express.json();

app.use(express.static(process.cwd() + "/dist/KaiserreichWiki/"));

app.use(express.urlencoded());

app.get("/admin", function (request, response) {

    response.sendStatus(403);
});

app.post("/account", function (request, response) {

    // если не переданы данные, возвращаем ошибку
    if(!request.body) return response.sendStatus(400);
     
    // получаем данные
    let username = request.body.name;
    let userage = request.body.age;
    // имитируем некоторую обработку данных, например, изменим значение userage
    userage = userage + 10;
     
    // отправка данных обратно клиенту
    response.json({"name": username, "age": userage});
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