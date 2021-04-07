const { Router } = require('express');
const photo = require("../../entities/photo/photo");
const express = require('express');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const { onErrorResumeNext, async } = require('rxjs');
const config = require('config');
const multer = require("multer");

const router = Router();

const jsonParser = express.json();

const UPLOADS_DIRECTORY = "src/assets/uploads";

const bodyParser = require("body-parser");

const titleFileDest = process.cwd() + "/dist/KaiserreichWiki/" + "index.html";

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

router.use(multer({ storage: storageConfig, fileFilter: fileFilter }).single("file"));

router.delete("/:id", async function(request, response) {
  const id = request.params.id;
  await photo.deletePhoto(id);
  response.status(200);
});

router.put("/:id", jsonParser, async function(request, response) {
  const id = request.params.id;
  try {

    if(!request.body) {
        response.sendStatus(400).json({message : "Empty body"});
    }

    const {name, path} = request.body;
    const datetime = Date.now().toString();
    await photo.updatePhoto(id, name, path, datetime);
    response.sendStatus(201).json();

  } catch(ex) {
    response.sendStatus(501).json({message: "Server error!"});
  }
})

router.post("/", jsonParser, async function(request, response) {

  try {

      if(!request.body) {
          response.sendStatus(400).json({message : "Empty body"});
      }

      const {name, path} = request.body;
      const datetime = Date.now().toString();
      await photo.createPhoto(name, path, datetime);
      response.sendStatus(201).json();

  } catch(ex) {
      response.sendStatus(501).json({message: "Server error!"});
  }
});

router.get("/",async function (request, response) {
  let photos = [];
  try {
    photos = await photo.getPhotos();
  }
  finally {
    response.json({photos: photos});
  }
});

module.exports = router;
