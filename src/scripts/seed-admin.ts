import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI || '';

async function seedAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@sankalan.com' });

    if (existingAdmin) {
      console.log('ℹ️  Admin user already exists');
      console.log('Email:', existingAdmin.email);
      console.log('Name:', existingAdmin.name);
      await mongoose.connection.close();
      return;
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);

    const admin = new Admin({
      adminId: 'ADM2025001',
      name: 'System Administrator',
      email: 'admin@sankalan.com',
      password: hashedPassword,
      role: 'admin',
      phone: '+1234567890',
    });

    await admin.save();

    console.log('✅ Admin user created successfully!');
    console.log('━'.repeat(50));
    console.log('Login Credentials:');
    console.log('Email:', 'admin@sankalan.com');
    console.log('Password:', 'admin123');
    console.log('━'.repeat(50));
    console.log('⚠️  Please change the password after first login!');
  } catch (error) {
    console.error('❌ Error seeding admin:', error);
  } finally {
    await mongoose.connection.close();
    console.log('✅ Database connection closed');
  }
}

// Run the seed function
seedAdmin();
