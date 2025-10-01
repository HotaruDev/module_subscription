import mongoose from 'mongoose';
import {createProduct, deleteProducts, getProduct, getProducts, updateProduct} from '../../../services/mongo/product.service.js';

export const create = async(req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const data = await createProduct(req, session);
        session.endSession();

        res.status(201).json({ success: true, data });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

export const index = async(req, res, next) => {
    try {
        const {pagination, products} = await getProducts(req);
        res.status(200).json({ success: true, products, pagination})
    } catch (error) {
        next(error);
    }
}
export const find = async(req, res, next) => {
    try {
        const data = await getProduct(req);
        res.status(200).json({ success: true, data });
    } catch (error) {
        next(error);
    }
}

export const update = async(req, res, next) => {
    try {
        const data = await updateProduct(req);
        res.status(200).json({ success: true, data });
    } catch (error) {
        next(error);
    }
}

export const destroy = async(req, res, next) => {
    try {
        await deleteProducts(req);
        res.status(200).json({ success: true, message: 'deleted has been successfully' });
    } catch (error) {
        next(error);
    }
}