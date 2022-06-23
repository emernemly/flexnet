const mongoose = require('mongoose');
const serieShema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    categorie: { type: String },
    type: { type: String },
    time: { type: Number },
    image: { type: String },
    description: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    obj: { type: String },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('serie', serieShema);
