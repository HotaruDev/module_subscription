import {Router} from 'express';
const subscriptionRoutes = Router()

subscriptionRoutes.get('/', (req, res) => res.status(200).send('GET all subscriptions'));

export default subscriptionRoutes;