import { Router } from 'express';
const productRouter = Router();
import {create, destroy, find, index, update} from '../controllers/product.controller.js';

productRouter.post('/', create);
productRouter.get('/', index);
productRouter.get('/:id', find);
productRouter.put('/:id', update);
productRouter.delete('/:id', destroy);

export default productRouter;