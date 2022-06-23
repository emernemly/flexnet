const mongoose = require('mongoose');
const userShema = new mongoose.Schema(
  {
    userName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('user', userShema);
