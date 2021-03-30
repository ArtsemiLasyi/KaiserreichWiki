const { Router } = require('express');
const account = require("../../entities/photo/photo");
const express = require('express');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const { onErrorResumeNext } = require('rxjs');
const config = require('config');
const multer = require("multer");

const router = Router();

const jsonParser = express.json();

const UPLOADS_DIRECTORY = "uploads";

const bodyParser = require("body-parser");

const storageConfig = multer.diskStorage({
  destination: (request, file, cb) => {
      cb(null, UPLOADS_DIRECTORY);
  },
  filename: (request, file, cb) => {
      cb(null, file.originalname);
  }
});

const fileFilter = (request, file, cb) => {

  if (file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg") {
      cb(null, true);
  }
  else {
      cb(null, false);
  }
}

router.use(multer({ storage: storageConfig, fileFilter: fileFilter }).single("filedata"));



router.get("/", jsonParser, async function(request, response) {

  try {
      const data = await photo.getPhotos();
      response.sendStatus(200).json(data);
  } catch(ex) {
      response.sendStatus(501).json({message: "Server error"});
  }
})

router.post("/", jsonParser, async function(request, response) {

  try {

      if(!request.body) {
          response.sendStatus(400).json({message : "Empty body"});
      }

      let filedata = request.file;
      if (!filedata)
        response.send("");
      else
        response.send("Файл загружен");

      const {name, path} = request.body.data;
      const datetime = Date.now();
      await photo.createPhoto(name, path, datetime);
      response.sendStatus(201).json();

  } catch(ex) {
      response.sendStatus(501).json({message: "Server error!"});
  }
});

module.exports = router;
