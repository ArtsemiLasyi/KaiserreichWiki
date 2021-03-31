const { Router } = require('express');
const express = require('express');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const { onErrorResumeNext } = require('rxjs');
const account = require("../../entities/account/account");
const config = require('config');
const bcrypt = require('bcryptjs');

const router = Router();

const jsonParser = express.json();

const SALT_LENGTH = 12;

router.post("/registration",
  [
    check("email", "Invalid email").isEmail(),
    check("password", "Password must be more than 8 symbols").isLength({min : 8})
  ],
  jsonParser, async function(request, response) {
  try {

    if(!request.body) {
      return response.status(400).json({message : "Empty body"});
    }

    const errors = validationResult(request.body);

    if (!errors.isEmpty()) {
      return response.status(400).json({
        errors : errors.array(),
        message : "Invalid data"
      });
    }

    const {email, password, login} = request.body;
    const isAccountAlreadyExist = await account.isAccountAlreadyExist(email, login);

    if (isAccountAlreadyExist) {
      return response.status(400).json({message: "Account with this email is already exists!"})
    }

    const hashedPassword = await bcrypt.hash(password, SALT_LENGTH);
    const accountId = await account.createNewAccount(login, email, hashedPassword);

    const token = jwt.sign(
      {userId: accountId},
      config.get('jwtSecret'),
      {expiresIn: '1h'}
  )

    response.status(201).cookie("SESSIONID", token, {httpOnly:true, secure:true});
  } catch (ex) {
    response.status(500).json({message : "Server error!"});
  }
})

router.post("/login",
  [
    check("email", "Invalid email").isEmail(),
    check("password", "Password must be more than 8 symbols").isLength({min : 8})
  ],
  jsonParser,
  async function(request, response) {
  try {

    if(!request.body) {
      return response.status(400).json({message : "Empty body"});
    }

    const errors = validationResult(request.body);

    if (!errors.isEmpty()) {
      return response.status(400).json({
        errors : errors.array(),
        message : "Invalid data"
      });
    }

    const {email, password} = request.body;
    const posAccount = await account.getAccountByEmail(email);
    const isPasswordsMatch = await bcrypt.compare(password, posAccount.password);

    if (!isPasswordsMatch) {
      return response.status(400).json({ message : "Invalid password" });
    }

    const token = jwt.sign(
      { userId : posAccount.id,},
      config.get("jwtSecret"),
      { expiresIn: "2h" }
    )

    response.json({ "token" : token, userId: posAccount.id });

  } catch (ex) {
    response.status(500).json({message : "Server error!"});
  }
})

module.exports = router;
