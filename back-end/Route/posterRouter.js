const express = require('express');
const { upload } = require('../Meddelwar/mullter');
const userToken = require('../Meddelwar/userToken');
const postershema = require('../Modul/postershema');
const posterRouter = express.Router();
//__________________add poster_______________________
posterRouter.post('/', userToken, upload.single('image'), async (req, res) => {
  try {
    const poster = new postershema({
      ...req.body,
      image: req.file.filename,
      createdBy: req.user,
    });
    await poster.save();
    res.status(200).send({ msg: 'add secc...', poster });
  } catch (error) {
    res.status(500).send({ msg: 'not add ! ' });
  }
});
//_______________________get all poster___________________
posterRouter.get('/', userToken, async (req, res) => {
  try {
    const poster = await postershema.find();
    res.status(200).send({ msg: 'all poster', poster });
  } catch (error) {
    res.status(500).send({ msg: 'not found !' });
  }
});
//________________________get poster by id__________________________
posterRouter.get('/myposter/:_id', userToken, async (req, res) => {
  try {
    const poster = await postershema.findById(req.params._id);
    res.status(200).send({ msg: 'poster found ', poster });
  } catch (error) {
    res.status(500).send({ msg: 'not found !' });
  }
});
//__________________update poster__________________________
posterRouter.put(
  '/:_id',
  userToken,
  upload.single('image'),
  async (req, res) => {
    try {
      const poster = await postershema.findByIdAndUpdate(req.params._id, {
        ...req.body,
        image: req.file ? req.file.filename : req.obj,
      });
      res.status(200).send({ msg: 'poster is update', poster });
    } catch (error) {
      res.status(500).send({ msg: 'poster not update !' });
    }
  }
);
//______________delete poster_______________________________
posterRouter.delete('/:_id', userToken, async (req, res) => {
  try {
    const poster = await postershema.findByIdAndDelete(req.params._id);
    res.status(200).send({ msg: 'poster delete', poster });
  } catch (error) {
    res.status((500).send({ msg: 'not delete !' }));
  }
});
module.exports = posterRouter;
