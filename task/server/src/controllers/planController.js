import Plan from '../models/Plan.js';
import sendResponse from '../utils/responseWrapper.js';

export const getPlans = async (req, res) => {
    const plans = await Plan.find({});
    return sendResponse(res, 200, 'Plans fetched successfully', plans, 'plans');
};
