import {Router} from 'express';
import { sendReminders } from '../../../services/mongo/workflow.service.js';
const workflowRouter = Router();

workflowRouter.post('/subscription/reminder', sendReminders);

export default workflowRouter;