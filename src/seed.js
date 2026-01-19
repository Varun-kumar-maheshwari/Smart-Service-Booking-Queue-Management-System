import mongoose from 'mongoose';
import dotenv from 'dotenv';

// 🛑 IMPORTANT: You MUST include '.js' at the end of local imports in ES Modules
import Service from './models/Service.js';
import Resource from './models/Resource.js';
import Booking from './models/Booking.js';

// Load environment variables
dotenv.config();

const seedDatabase = async () => {
  try {
    // 1. Connect to MongoDB
    // Make sure process.env.MONGO_URI is set in your .env file
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing in .env file");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB...');

    // 2. CLEAR existing data
    await Service.deleteMany({});
    await Resource.deleteMany({});
    await Booking.deleteMany({});
    console.log('🧹 Old data cleared.');

    // 3. Create the "Shop" (Service)
    const gamingCafe = await Service.create({
        name: "Varun's Ultimate Gaming Zone",
        description: "The best high-performance PC cafe in Bhopal.",
        type: "CAFE",
        openingTime: "09:00",
        closingTime: "22:00"
        // admin: "65a..." (Uncomment and add real User ID if your schema requires it)
    });

    console.log(`🏥 Service Created: ${gamingCafe.name}`);

    // 4. Create the "PCs" (Resources) linked to that Shop
    const pcs = [
        { name: "PC-01 (RTX 4090 - VIP)", service: gamingCafe._id },
        { name: "PC-02 (RTX 3060 - Standard)", service: gamingCafe._id },
        { name: "PC-03 (RTX 3060 - Standard)", service: gamingCafe._id },
        { name: "PC-04 (Console - PS5)", service: gamingCafe._id },
        { name: "PC-05 (Console - Xbox)", service: gamingCafe._id }
    ];

    const createdResources = await Resource.insertMany(pcs);
    console.log(`🖥️  ${createdResources.length} Resources created successfully!`);

    // 5. Done!
    console.log('🌱 Database Seeded Successfully.');
    process.exit();

  } catch (error) {
    console.error('❌ Seeding Failed:', error);
    process.exit(1);
  }
};

// Run the function
seedDatabase();