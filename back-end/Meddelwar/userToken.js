const express = require('express');
const jwt = require('jsonwebtoken');
const userShema = require('../Modul/userShema');
require('dotenv').config();
const userToken = async (req, res, next) => {
  try {
    const token = req.headers['authentication'];
    if (!token) {
      return res.status(400).send({ msg: 'you not auth ' });
    }
    const decoded = jwt.verify(token, process.env.orKey);
    if (!decoded) {
      return res.status(400).send({ msg: 'you not auth' });
    }
    const user = await userShema.findById(decoded._id);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};
module.exports = userToken;
