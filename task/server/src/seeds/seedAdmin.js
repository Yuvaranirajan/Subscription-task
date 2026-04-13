import mongoose from 'mongoose';
import 'dotenv/config';
import User from '../models/User.js';


const seedAdmin = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined');
        }

        await mongoose.connect(process.env.MONGODB_URI);
        
        const adminData = {
            name: 'Super Admin',
            email: 'superadmin@gmail.com',
            password: 'SuperAdmin@123',
            role: 'admin'
        };

        let adminUser = await User.findOne({ email: adminData.email });
        
        if (adminUser) {
            console.log(`Admin user already exists (${adminData.email}). Updating credentials...`);
            adminUser.name = adminData.name;
            adminUser.password = adminData.password; 
            await adminUser.save();
            console.log('Admin user updated successfully!');
        } else {
            console.log(`Creating new admin user: ${adminData.email}`);
            adminUser = new User(adminData);
            await adminUser.save();
            console.log('Admin user created successfully!');
        }


        
        process.exit(0);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedAdmin();
