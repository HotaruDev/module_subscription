import Product from "../../api/v1/models/product.model.js";
import Stripe from "stripe";
import {STRIPE_SECRET_KEY} from '../../config/env.js';
import {NotFoundError} from "../../errors/index.js";

const stripe = new Stripe(STRIPE_SECRET_KEY)

export const createProduct = async(req, session) => {
    const {name, description, unit_amount, currency, interval, category} = req.body;

    const product = await stripe.products.create({name, description});
    const price = await stripe.prices.create({product: product.id, unit_amount, currency, recurring: {interval}});

    const insertProduct = await Product.create({product, price, category})
    return insertProduct; 
}

export const getProducts = async(req) => {
    const { page=1, limit=10 } = req.query;
    const condition = {};
    
    const products = await Product.find(condition)
    .limit(limit)
    .skip(limit * (page - 1))

    const count = await Product.countDocuments(condition);
    return {products, pagination: {total_page: Math.ceil(count/limit), total_data: count}}
}

export const getProduct = async(req) => {
    const product = await Product.findById(req.params.id);
    if(!product) throw new NotFoundError('product not found');

    return product;
}

export const updateProduct = async(req) => {
    const {name, description, unit_amount, currency, interval, category} = req.body;

    const check_product = await Product.findById(req.params.id);
    if(!check_product) throw new NotFoundError('product not found');

    await stripe.prices.update(check_product.price.id, {active: false});

    const updated_product = await stripe.products.update(check_product.product.id, {name, description});
    const updated_price = await stripe.prices.create({
        product: check_product.product.id, 
        unit_amount: unit_amount || check_product.price.unit_amount, 
        currency: currency || check_product.price.currency, 
        recurring: {interval: interval || check_product.price.recurring.interval}
    });

    return await Product.findByIdAndUpdate(check_product._id, {product: updated_product, price: updated_price, category}, {new: true, runValidators: true});
}

export const deleteProducts = async(req) => {
    const check_product = await Product.findByIdAndDelete(req.params.id);
    if(!check_product) throw new NotFoundError('product not found');
    await stripe.prices.update(check_product.price.id, {active: false});
    await stripe.products.update(check_product.product.id, {active: false});
    return;
}