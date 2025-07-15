import mongoose from 'mongoose';

const countrySchema = new mongoose.Schema({
  name: String,
  capital: String,
  region: String,
  population: Number
});

import mongoosePaginate from 'mongoose-paginate-v2';
countrySchema.plugin(mongoosePaginate);

export const Country = mongoose.model('Country', countrySchema);