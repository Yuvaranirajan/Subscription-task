import 'dotenv/config';
import mongoose from 'mongoose';
import Plan from '../models/Plan.js';

const plans = [
    {
        name: 'Basic',
        price: 100,
        features: ['Up to 5 projects', 'Community Support', 'Basic Analytics'],
        duration: 30
    },
    {
        name: 'Pro',
        price: 300,
        features: ['Unlimited projects', 'Priority Support', 'Advanced Analytics', 'Custom Domains'],
        duration: 30
    },
    {
        name: 'Enterprise',
        price: 1000,
        features: ['Unlimited everything', 'Dedicated Support', 'SSO & Security', 'Custom API access'],
        duration: 30
    }
];

const seedPlans = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        
        await Plan.deleteMany();
        await Plan.insertMany(plans);
        
        console.log('Plans seeded successfully');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedPlans();
