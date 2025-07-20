import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const uri = 'mongodb://localhost:27017/merge_example';
await mongoose.connect(uri);

const productSchema = new Schema({
    name: String,
    price: Number,
    tags: [String],
    hasDiscount: Boolean,
    discountRate: Number
});

const Product = mongoose.model('Product', productSchema);

await Product.deleteMany({});
await Product.insertMany([
    { name: 'Laptop', price: 1000, tags: ['electronics'], hasDiscount: true, discountRate: 0.2 },
    { name: 'Phone', price: 500, tags: ['mobile'], hasDiscount: false },
    { name: 'Book', price: 40, tags: ['education'], hasDiscount: true, discountRate: 0.1 },
    { name: 'Desk', price: 200, tags: ['furniture'], hasDiscount: true, discountRate: 0.15 }
]);

const DiscountedProduct = mongoose.connection.collection('discounted_products');
await DiscountedProduct.deleteMany({});

await Product.aggregate([
    {
        $match: { hasDiscount: true }
    },
    {
        $addFields: {
            discountPrice: {
                $subtract: [
                    '$price',
                    { $multiply: ['$price', '$discountRate'] }
                ]
            },
            uppercaseName: { $toUpper: '$name' },
            firstTag: { $arrayElemAt: ['$tags', 0] }
        }
    },
    {
        $project: {
            _id: 0,
            name: 1,
            price: 1,
            discountRate: {
                $concat: [
                    { $toString: { $multiply: [100, '$discountRate'] } },'%']
            },
            discountPrice: 1,
            uppercaseName: 1,
            firstTag: 1
        }
    },
    {
        $merge: {
            into: 'discounted_products',
            whenMatched: 'merge',
            whenNotMatched: 'insert'
        }
    }
]);

const result = await DiscountedProduct.find().toArray();
console.log('Discounted Products:\n', result);

process.exit();
