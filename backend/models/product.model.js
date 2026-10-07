const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image_url: {
      type: String,
      required: true,
      trim: true,
    },
    // Id de categoría (ej. "cat_01"). El catálogo de categorías por ahora
    // no vive en base de datos, así que aquí solo se guarda el id, sin
    // validarlo contra una lista fija.
    category_id: {
      type: String,
      required: true,
      trim: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    sku: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    prep_time_minutes: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    collection: 'products',
    timestamps: true,
  }
);

productSchema.index({ category_id: 1 });
productSchema.index({ sku: 1 }, { unique: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
