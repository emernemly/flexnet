const express = require('express');
const { upload } = require('../Meddelwar/mullter');
const userToken = require('../Meddelwar/userToken');
const MovieShema = require('../Modul/MovieShema');
const serieShema = require('../Modul/serieShema');
const serieRouter = express.Router();
//_____________________post global serie_______________________
serieRouter.post(
  '/:_id',
  userToken,
  upload.single('image'),
  async (req, res) => {
    try {
      const serie = new serieShema({
        ...req.body,
        createdBy: req.user,
        image: req.file.filename,
        posterId: req.params._id,
      });
      await serie.save();
      res.status(200).send({ msg: 'serie is add', serie });
    } catch (error) {
      res.status(500).send({ msg: 'serie not add' });
      console.log(error);
    }
  }
);
//_____________________get all global serie_______________
serieRouter.get('/', userToken, async (req, res) => {
  try {
    const serie = await serieShema.find();
    res.status(200).send({ msg: 'all serie', serie });
  } catch (error) {
    res.status(500).send({ msg: 'not found !' });
  }
});
//______________________update gloabl serie___________________
serieRouter.put(
  '/:_id',
  userToken,
  upload.single('image'),
  async (req, res) => {
    try {
      const serie = await serieShema.findByIdAndUpdate(req.params._id, {
        ...req.body,
        image: req.file ? req.file.filename : req.obj,
      });
      res.status(200).send({ msg: 'serie is update', serie });
    } catch (error) {
      res.status(500).send({ msg: 'Not update ! ' });
    }
  }
);
//________________________delete globale serie____________________
serieRouter.delete('/:_id', userToken, async (req, res) => {
  try {
    const movie = await MovieShema.deleteMany({ serieId: req.params._id });
    const serie = await serieShema.findByIdAndDelete(req.params._id);
    res.status(200).send({ msg: 'serie is delete', serie, movie });
  } catch (error) {
    res.status(500).send({ msg: 'serie not delete !' });
    console.log(error);
  }
});
//_____________________________get serie by id __________________
serieRouter.get('/myserie/:_id', userToken, async (req, res) => {
  try {
    const serie = await serieShema.findById(req.params._id);
    res.status(200).send({ msg: 'find secc...', serie });
  } catch (error) {
    res.status(500).send({ msg: 'not found' });
  }
});
//________________________get serie by poster___________________
serieRouter.get('/season/:_id', userToken, async (req, res) => {
  try {
    const serie = await serieShema.find({ posterId: req.params._id });
    res.status(200).send({ msg: 'all season', serie });
  } catch (error) {
    res.status(500).send({ msg: 'not found !' });
  }
});
module.exports = serieRouter;
