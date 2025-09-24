import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Student from '@/models/Student';
import Faculty from '@/models/Faculty';
import Activity from '@/models/Activity';
import Class from '@/models/Class';
import Placement from '@/models/Placement';
import bcrypt from 'bcryptjs';
import demoData from '@/data/demo-data.json';

async function seedDatabase() {
  try {
    await dbConnect();
    
    console.log('🌱 Starting database seeding...');
    
    // Clear existing data with proper error handling
    console.log('🧹 Clearing existing data...');
    try {
      await Promise.all([
        User.deleteMany({}),
        Student.deleteMany({}),
        Faculty.deleteMany({}),
        Activity.deleteMany({}),
        Class.deleteMany({}),
        Placement.deleteMany({})
      ]);
      console.log('✅ Successfully cleared existing data');
    } catch (clearError) {
      console.log('⚠️ Warning: Some collections may not exist yet, continuing...');
    }
    
    // Clean up problematic indexes
    console.log('🧹 Cleaning up indexes...');
    try {
      const db = (await dbConnect()).connection.db;
      
      // Try to drop problematic username index if it exists
      try {
        await db.collection('users').dropIndex('username_1');
        console.log('✅ Dropped username_1 index');
      } catch (indexError) {
        // Index doesn't exist, that's fine
      }
    } catch (indexCleanupError) {
      console.log('⚠️ Warning: Could not clean indexes, continuing...');
    }
    
    // Add a small delay to ensure cleanup is complete
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Seed Users with upsert logic
    console.log('👥 Seeding users...');
    const createdUsers = [];
    
    for (const user of demoData.users) {
      const { _id, ...userWithoutId } = user;
      const hashedPassword = await bcrypt.hash(user.password, 10);
      
      try {
        const existingUser = await User.findOne({ email: user.email });
        if (existingUser) {
          // Update existing user
          await User.findOneAndUpdate(
            { email: user.email },
            { ...userWithoutId, password: hashedPassword },
            { new: true }
          );
          createdUsers.push(existingUser);
        } else {
          // Create new user
          const newUser = await User.create({
            ...userWithoutId,
            password: hashedPassword
          });
          createdUsers.push(newUser);
        }
      } catch (userError: any) {
        if (userError.code === 11000) {
          // Duplicate key error - find existing user
          const existingUser = await User.findOne({ email: user.email });
          if (existingUser) {
            createdUsers.push(existingUser);
          }
        } else {
          throw userError;
        }
      }
    }
    
    console.log(`✅ Processed ${createdUsers.length} users`);
    
    // Seed Faculty
    console.log('👨‍🏫 Seeding faculty...');
    const createdFaculty = [];
    
    for (const faculty of demoData.faculty) {
      const { _id, userId, ...facultyWithoutId } = faculty;
      const facultyUserId = createdUsers.find(u => u.email === faculty.email)?._id;
      
      console.log(`Processing faculty: ${faculty.email}, found userId: ${facultyUserId}`);
      
      if (!facultyUserId) {
        console.log(`Warning: No user found for faculty email: ${faculty.email}`);
        console.log('Available users:', createdUsers.map(u => ({ email: u.email, id: u._id })));
        continue; // Skip this faculty if no corresponding user found
      }
      
      try {
        const existingFaculty = await Faculty.findOne({ 
          $or: [{ email: faculty.email }, { facultyId: faculty.facultyId }]
        });
        
        if (existingFaculty) {
          // Update existing faculty
          const updatedFaculty = await Faculty.findOneAndUpdate(
            { email: faculty.email },
            { ...facultyWithoutId, userId: facultyUserId },
            { new: true }
          );
          createdFaculty.push(updatedFaculty);
        } else {
          // Create new faculty
          const newFaculty = await Faculty.create({
            ...facultyWithoutId,
            userId: facultyUserId
          });
          createdFaculty.push(newFaculty);
        }
      } catch (facultyError: any) {
        if (facultyError.code === 11000) {
          // Duplicate key error - find existing faculty
          const existingFaculty = await Faculty.findOne({ 
            $or: [{ email: faculty.email }, { facultyId: faculty.facultyId }]
          });
          if (existingFaculty) {
            createdFaculty.push(existingFaculty);
          }
        } else {
          console.error(`Error creating faculty ${faculty.email}:`, facultyError);
          throw facultyError;
        }
      }
    }
    
    console.log(`✅ Processed ${createdFaculty.length} faculty members`);
    
    // Seed Students
    console.log('👨‍🎓 Seeding students...');
    const createdStudents = [];
    
    for (const student of demoData.students) {
      const { _id, userId, ...studentWithoutId } = student;
      const studentUserId = createdUsers.find(u => u.email === student.email)?._id;
      
      console.log(`Processing student: ${student.email}, found userId: ${studentUserId}`);
      
      if (!studentUserId) {
        console.log(`Warning: No user found for student email: ${student.email}`);
        continue; // Skip this student if no corresponding user found
      }
      
      try {
        const existingStudent = await Student.findOne({ 
          $or: [{ email: student.email }, { studentId: student.studentId }]
        });
        
        if (existingStudent) {
          // Update existing student
          const updatedStudent = await Student.findOneAndUpdate(
            { email: student.email },
            { ...studentWithoutId, userId: studentUserId },
            { new: true }
          );
          createdStudents.push(updatedStudent);
        } else {
          // Create new student
          const newStudent = await Student.create({
            ...studentWithoutId,
            userId: studentUserId
          });
          createdStudents.push(newStudent);
        }
      } catch (studentError: any) {
        if (studentError.code === 11000) {
          // Duplicate key error - find existing student
          const existingStudent = await Student.findOne({ 
            $or: [{ email: student.email }, { studentId: student.studentId }]
          });
          if (existingStudent) {
            createdStudents.push(existingStudent);
          }
        } else {
          throw studentError;
        }
      }
    }
    
    console.log(`✅ Processed ${createdStudents.length} students`);
    
    // Seed Activities
    console.log('🎯 Seeding activities...');
    const activitiesData = demoData.activities.map(activity => {
      const { _id, ...activityWithoutId } = activity;
      return {
        ...activityWithoutId,
        studentId: createdStudents.find(s => s.studentId === activity.studentId)?._id,
        approvedBy: activity.approvedBy ? createdFaculty.find(f => f.facultyId === activity.approvedBy)?._id : undefined
      };
    }).filter(activity => activity.studentId); // Only include activities with valid studentId
    
    let createdActivities = [];
    try {
      createdActivities = await Activity.insertMany(activitiesData, { ordered: false });
    } catch (error: any) {
      if (error.code === 11000) {
        console.log('⚠️ Some activities already exist, continuing...');
        createdActivities = await Activity.find({});
      } else {
        throw error;
      }
    }
    console.log(`✅ Processed ${createdActivities.length} activities`);
    
    // Seed Classes
    console.log('📚 Seeding classes...');
    const classesData = demoData.classes.map(classItem => {
      const { _id, ...classWithoutId } = classItem;
      return {
        ...classWithoutId,
        facultyId: createdFaculty.find(f => f.facultyId === classItem.facultyId)?._id,
        enrolledStudents: classItem.enrolledStudents.map(studentId => 
          createdStudents.find(s => s.studentId === studentId)?._id
        ).filter(Boolean)
      };
    }).filter(classItem => classItem.facultyId); // Only include classes with valid facultyId
    
    let createdClasses = [];
    try {
      createdClasses = await Class.insertMany(classesData, { ordered: false });
    } catch (error: any) {
      if (error.code === 11000) {
        console.log('⚠️ Some classes already exist, continuing...');
        createdClasses = await Class.find({});
      } else {
        throw error;
      }
    }
    console.log(`✅ Processed ${createdClasses.length} classes`);
    
    // Seed Placements
    console.log('💼 Seeding placements...');
    const placementsData = demoData.placements.map(placement => {
      const { _id, ...placementWithoutId } = placement;
      return {
        ...placementWithoutId,
        createdBy: createdUsers.find(u => u.email === 'admin@sankalan.com')?._id,
        appliedStudents: placement.appliedStudents?.map(studentId =>
          createdStudents.find(s => s.studentId === studentId)?._id
        ).filter(Boolean) || [],
        selectedStudents: placement.selectedStudents?.map(studentId =>
          createdStudents.find(s => s.studentId === studentId)?._id
        ).filter(Boolean) || []
      };
    });
    
    let createdPlacements = [];
    try {
      createdPlacements = await Placement.insertMany(placementsData, { ordered: false });
    } catch (error: any) {
      if (error.code === 11000) {
        console.log('⚠️ Some placements already exist, continuing...');
        createdPlacements = await Placement.find({});
      } else {
        throw error;
      }
    }
    console.log(`✅ Processed ${createdPlacements.length} placements`);
    
    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📋 Summary:');
    console.log(`- Users: ${createdUsers.length}`);
    console.log(`- Faculty: ${createdFaculty.length}`);
    console.log(`- Students: ${createdStudents.length}`);
    console.log(`- Activities: ${createdActivities.length}`);
    console.log(`- Classes: ${createdClasses.length}`);
    console.log(`- Placements: ${createdPlacements.length}`);
    
    console.log('\n🔐 Login Credentials:');
    console.log('Admin: admin@sankalan.com / admin123');
    console.log('Faculty: faculty@sankalan.com / faculty123');
    console.log('Student: student@sankalan.com / student123');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

export default seedDatabase;