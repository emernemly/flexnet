const mongoose = require('mongoose');
const posterShema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    categorie: { type: String },
    type: { type: String },
    image: { type: String },
    description: { type: String },
    rating: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    obj: { type: String },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('poster', posterShema);
