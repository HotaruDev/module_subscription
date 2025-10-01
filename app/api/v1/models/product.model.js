import mongoose  from "mongoose";

const productSchema = new mongoose.Schema({
    product: {
        type: Object,
        required: true
    },
    price: {
        type: Object,
        required: true
    },
    category: {
        type: String,
        enum: ['basic', 'premium', 'enterprise'],
        required: true
    },
}, {timestamps: true});

const Product = mongoose.model('Product', productSchema);
export default Product;