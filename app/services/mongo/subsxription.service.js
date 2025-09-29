import { workflowClient } from "../../config/upstash.js";

import { SERVER_URL } from "../../config/env.js";
import Subscription from "../../api/v1/models/subscription.model.js";
import UnauthenticatedError from "../../errors/Unauthenticated.js";

export const createSubscription = async(req) => {
    const subscription = await Subscription.create({...req.body, user: req.user.id});
    const {workflowRunId} = await workflowClient.trigger({
        url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
        body: {
            subscriptionId: subscription.id,
        },
        headers: {
            'content-type': 'application/json',
        },
        retries: 0,
    });
    return {subscription, workflowRunId};
};

export const getSubscriptions = async(req) => {
    if(req.user.id !== req.params.id) throw new UnauthenticatedError('You are not the owner of this account');

    const subscriptions = await Subscription.find({user: req.params.id});
    return subscriptions;
};