import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const uri = 'mongodb://localhost:27017/add-fields-example';
await mongoose.connect(uri);

const productSchema = new Schema({
  name: String,
  price: Number,
  tags: [String]
});

const Product = mongoose.model('Product', productSchema);

await Product.deleteMany({});
await Product.insertMany([
  { name: 'Laptop', price: 1000, tags: ['electronics', 'computing'] },
  { name: 'Phone', price: 500, tags: ['electronics', 'mobile'] },
  { name: 'Book', price: 40, tags: ['reading', 'education'] }
]);

const result = await Product.aggregate([
  {
    $addFields: {
      discountPrice: { $multiply: ['$price', 0.8] },
      upperCaseName: { $toUpper: '$name' },
      firstTag: { $arrayElemAt: ['$tags', 0] }
    }
  },
  {
    $project: {
      _id: 0,
      name: 1,
      price: 1,
      discountPrice: 1,
      upperCaseName: 1,
      firstTag: 1
    }
  }
]);

console.log('With Added Fields:', result);
