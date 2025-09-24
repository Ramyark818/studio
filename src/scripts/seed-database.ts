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
    
    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await User.deleteMany({});
    await Student.deleteMany({});
    await Faculty.deleteMany({});
    await Activity.deleteMany({});
    await Class.deleteMany({});
    await Placement.deleteMany({});
    
    // Seed Users
    console.log('👥 Seeding users...');
    const usersWithHashedPasswords = await Promise.all(
      demoData.users.map(async (user) => {
        const { _id, ...userWithoutId } = user;
        return {
          ...userWithoutId,
          password: await bcrypt.hash(user.password, 10)
        };
      })
    );
    
    const createdUsers = await User.insertMany(usersWithHashedPasswords);
    console.log(`✅ Created ${createdUsers.length} users`);
    
    // Seed Faculty
    console.log('👨‍🏫 Seeding faculty...');
    const facultyData = demoData.faculty.map(faculty => {
      const { _id, userId, ...facultyWithoutId } = faculty;
      return {
        ...facultyWithoutId,
        userId: createdUsers.find(u => u.email === faculty.email)?._id
      };
    });
    
    const createdFaculty = await Faculty.insertMany(facultyData);
    console.log(`✅ Created ${createdFaculty.length} faculty members`);
    
    // Seed Students
    console.log('👨‍🎓 Seeding students...');
    const studentsData = demoData.students.map(student => {
      const { _id, userId, ...studentWithoutId } = student;
      return {
        ...studentWithoutId,
        userId: createdUsers.find(u => u.email === student.email)?._id
      };
    });
    
    const createdStudents = await Student.insertMany(studentsData);
    console.log(`✅ Created ${createdStudents.length} students`);
    
    // Seed Activities
    console.log('🎯 Seeding activities...');
    const activitiesData = demoData.activities.map(activity => {
      const { _id, ...activityWithoutId } = activity;
      return {
        ...activityWithoutId,
        studentId: createdStudents.find(s => s.studentId === activity.studentId)?._id,
        approvedBy: activity.approvedBy ? createdFaculty.find(f => f.facultyId === activity.approvedBy)?._id : undefined
      };
    });
    
    const createdActivities = await Activity.insertMany(activitiesData);
    console.log(`✅ Created ${createdActivities.length} activities`);
    
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
    });
    
    const createdClasses = await Class.insertMany(classesData);
    console.log(`✅ Created ${createdClasses.length} classes`);
    
    // Seed Placements
    console.log('💼 Seeding placements...');
    const placementsData = demoData.placements.map(placement => {
      const { _id, ...placementWithoutId } = placement;
      return {
        ...placementWithoutId,
        createdBy: createdUsers.find(u => u.email === 'admin@sankalan.com')?._id,
        appliedStudents: placement.appliedStudents.map(studentId =>
          createdStudents.find(s => s.studentId === studentId)?._id
        ).filter(Boolean),
        selectedStudents: placement.selectedStudents.map(studentId =>
          createdStudents.find(s => s.studentId === studentId)?._id
        ).filter(Boolean)
      };
    });
    
    const createdPlacements = await Placement.insertMany(placementsData);
    console.log(`✅ Created ${createdPlacements.length} placements`);
    
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