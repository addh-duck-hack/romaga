const mongoose = require('mongoose');

const movilSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  {
    collection: 'movil',
    timestamps: true,
  }
);

const Movil = mongoose.model('Movil', movilSchema);
module.exports = Movil;
