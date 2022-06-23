const mongoose = require('mongoose');
const movieShema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    categorie: { type: String },
    type: { type: String },
    time: { type: String },
    image: { type: String },
    description: { type: String },
    rating: { type: Number },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    serieId: { type: mongoose.Schema.Types.ObjectId, ref: 'serie' },
    obj: { type: String },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('movie', movieShema);
