import Subscription from '../models/Subscription.js';
import Plan from '../models/Plan.js';
import User from '../models/User.js';
import sendResponse from '../utils/responseWrapper.js';

export const subscribe = async (req, res) => {
    const { planId } = req.body;

    const plan = await Plan.findById(planId);
    if (!plan) {
        return sendResponse(res, 404, 'Plan not found', null, 'subscriptions');
    }

    const endDate = new Date();
    endDate.setDate(endDate.getDate() + plan.duration);

    const existingSub = await Subscription.findOne({ 
        userId: req.user._id, 
        status: 'active' 
    });

    if (existingSub) {
        existingSub.status = 'canceled';
        await existingSub.save();
    }

    const subscription = await Subscription.create({
        userId: req.user._id,
        planId,
        endDate,
        status: 'active'
    });

    return sendResponse(res, 201, 'Subscribed successfully', subscription, 'subscriptions');
};

export const getMySubscription = async (req, res) => {
    const subscription = await Subscription.findOne({ 
        userId: req.user._id, 
        status: 'active' 
    }).populate('planId');

    if (subscription) {
        return sendResponse(res, 200, 'Subscription fetched successfully', subscription, 'subscriptions');
    } else {
        return sendResponse(res, 404, 'No active subscription found', null, 'subscriptions');
    }
};

export const getAllSubscriptions = async (req, res) => {
    const { search, page = 1, limit = 10, status, planId } = req.query;
    let query = {};

    const skip = (parseInt(page) - 1) * parseInt(limit);

    if (status) query.status = status;
    if (planId) query.planId = planId;

    if (search) {

        const matchedUsers = await User.find({
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ]
        }).select('_id');

        const matchedPlans = await Plan.find({
            name: { $regex: search, $options: 'i' }
        }).select('_id');

        const userIds = matchedUsers.map(u => u._id);
        const planIds = matchedPlans.map(p => p._id);

        const searchCriteria = {
            $or: [
                { userId: { $in: userIds } },
                { planId: { $in: planIds } }
            ]
        };

        if (Object.keys(query).length > 0) {
            query = { $and: [query, searchCriteria] };
        } else {
            query = searchCriteria;
        }
    }

    const totalCount = await Subscription.countDocuments(query);
    const subscriptions = await Subscription.find(query)
        .populate('userId', 'name email')
        .populate('planId')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

    const totalPages = Math.ceil(totalCount / limit);

    return sendResponse(res, 200, 'All subscriptions fetched successfully', {
        subscriptions,
        totalCount,
        totalPages,
        currentPage: parseInt(page),
        hasMore: parseInt(page) < totalPages
    }, 'subscriptions');
};
