const express = require('express');
const { upload } = require('../Meddelwar/mullter');
const userToken = require('../Meddelwar/userToken');
const MovieShema = require('../Modul/MovieShema');
const movieRouter = express.Router();
//__________post movie_____________
movieRouter.post(
  '/:_id',
  userToken,
  upload.single('image'),
  async (req, res) => {
    try {
      const movie = new MovieShema({
        ...req.body,
        image: req.file.filename,
        createdBy: req.user,
        serieId: req.params._id,
      });
      await movie.save();
      res.status(200).send({ msg: 'add secc ...', movie });
    } catch (error) {
      res.status(500).send({ msg: 'Not add !' });
      console.log(error);
    }
  }
);
//________________get all movie______________________
movieRouter.get('/', userToken, async (req, res) => {
  try {
    const movie = await MovieShema.find();
    res.status(200).send({ msg: 'all movie', movie });
  } catch (error) {
    res.status(500).send({ msg: 'not found !' });
  }
});
//_____________________update movie______________________
movieRouter.put(
  '/:_id',
  userToken,
  upload.single('image'),
  async (req, res) => {
    try {
      const movie = await MovieShema.findByIdAndUpdate(req.params._id, {
        ...req.body,
        image: req.file ? req.file.filename : req.obj,
      });
      res.status(200).send({ msg: 'movie is update', movie });
    } catch (error) {
      res.status(500).send({ msg: 'not update !' });
    }
  }
);
//_______________________find Ep____________________
movieRouter.get('/ep/:_id', userToken, async (req, res) => {
  try {
    const movie = await MovieShema.find({ serieId: req.params._id });
    res.status(200).send({ msg: 'Ep found', movie });
  } catch (error) {
    res.status(500).send({ msg: 'not found ! ' });
    console.log(error);
  }
});
//________________________find by id_______________________
movieRouter.get('/mymovie/:_id', userToken, async (req, res) => {
  try {
    const movie = await MovieShema.findById(req.params._id);
    res.status(200).send({ msg: 'serie find', movie });
  } catch (error) {
    res.status(500).send({ msg: 'Not found !' });
  }
});
//___________________delete movie_________________________
movieRouter.delete('/:_id', userToken, async (req, res) => {
  try {
    const movie = await MovieShema.findByIdAndDelete(req.params._id);
    res.status(200).send({ msg: 'movie is delete ', movie });
  } catch (error) {
    res.status(500).send({ msg: 'not delete' });
  }
});
module.exports = movieRouter;
