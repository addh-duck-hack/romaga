const mongoose = require('mongoose');

const movilSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      trim: true,
    },
    target: {
      type: String,
      trim: true,
      default: null,
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

// Un mismo `key` (ej. "home", "promotion") puede tener varios documentos
// diferenciados por `target` (ej. "promo_martes"). Para documentos sin
// target (como "home") sigue siendo único por key.
movilSchema.index({ key: 1, target: 1 }, { unique: true });

const Movil = mongoose.model('Movil', movilSchema);
module.exports = Movil;
