import {createSubscription, getSubscriptions} from '../../../services/mongo/subsxription.service.js';

export const create = async(req, res, next) => {
    try {
        const {subscription, workflowRunId} = await createSubscription(req);
        res.status(201).json({ success: true, workflowRunId, subscription });
    } catch (error) {
        next(error);
    }
};

export const usersubs = async(req, res, next) => {
    try {
        const subscriptions = await getSubscriptions(req);
        res.status(200).json({ success: true, subscriptions })
    } catch (error) {
        next(error);
    }
}