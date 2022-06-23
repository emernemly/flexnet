const express = require('express');
const userRoute = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userShema = require('../Modul/userShema');
const { rgvalidation, validation } = require('../Meddelwar/Validation');
const userToken = require('../Meddelwar/userToken');
require('dotenv').config();
//---------------user sign-up--------------
userRoute.post('/signUP', rgvalidation, validation, async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const user = new userShema(req.body);

    const find = await userShema.findOne({ email });
    if (find) {
      return res.status(400).send({ msg: 'user already exist' });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    user.password = hash;
    const token = jwt.sign({ _id: user._id }, process.env.orKey);
    await user.save();
    res.status(200).send({ msg: 'add secc...', user, token });
  } catch (error) {
    res.status(500).send({ msg: 'not add !' });
  }
});
//____________________ user sign-in_________________________
userRoute.post('/signIN', async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const user = await userShema.findOne({ email });
    if (user) {
      const match = bcrypt.compareSync(password, user.password);
      if (!match) {
        return res.status(400).send({ msg: 'bad credentials' });
      }
      const token = jwt.sign({ _id: user._id }, process.env.orKey);
      return res.status(200).send({ msg: 'login sec...', user, token });
    } else {
      return res.status(400).send({ msg: 'bad credentials' });
    }
  } catch (error) {
    return res.status(500).send({ msg: 'not login now !' });
  }
});
//_________________ get all user_______________________
userRoute.get('/', async (req, resp) => {
  try {
    const user = await userShema.find();
    resp.status(200).send({ msg: 'all user', user });
  } catch (error) {
    resp.status.send({ msg: "can't not get " });
  }
});
//_____________________update user_______________________
userRoute.put('/:_id', userToken, async (req, res) => {
  try {
    const user = await userShema.findByIdAndUpdate(req.params._id, {
      ...req.body,
    });
    res.status(200).send({ msg: 'user is update', user });
  } catch (error) {
    res.status(500).send({ msg: 'user not update' });
    console.log(error);
  }
});
//_____________________delete user___________________________
userRoute.delete('/:_id', userToken, async (req, resp) => {
  try {
    const user = await userShema.findOneAndDelete(req.params._id);
    resp.status(200).send({ msg: 'user is delete', user });
  } catch (error) {
    resp.status(500).send({ msg: 'user not delete' });
  }
});
//_________________________ userToken________________________
userRoute.get('/myUser', userToken, (req, res) => {
  res.send(req.user);
});
module.exports = userRoute;
