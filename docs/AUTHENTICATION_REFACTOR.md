# Authentication System Refactor

## Overview

The authentication system has been refactored to remove the separate `User` model and integrate authentication directly into the `Student` and `Faculty` models.

## Changes Made

### 1. **Models Updated**

#### Student Model (`src/models/Student.ts`)

- Added `password` field (required, hashed)
- Added `role` field (default: 'student', immutable)
- Added `avatarUrl` field (optional)
- Removed `userId` reference to User model

#### Faculty Model (`src/models/Faculty.ts`)

- Added `password` field (required, hashed)
- Added `role` field (default: 'faculty', immutable)
- Added `avatarUrl` field (optional)
- Removed `userId` reference to User model

### 2. **Authentication Flow**

#### Login API (`src/app/api/auth/login/route.ts`)

- **Admin Login**: Hardcoded credentials (email: `admin@sankalan.com`, password: `admin123`)
- **Student Login**: Authenticates against Student collection
- **Faculty Login**: Authenticates against Faculty collection
- Removed dependency on User model
- Returns JWT token with user details and role

#### Student API Routes

**`src/app/api/students/route.ts`**

- POST: Creates student with hashed password directly (no User creation)
- GET: Returns students without password field
- Default password: `student123` if not provided

**`src/app/api/students/[id]/route.ts`**

- GET: Returns student without password
- PUT: Updates student, hashes password if changed, validates email uniqueness
- DELETE: Deletes student directly (no User deletion)

#### Faculty API Routes

**`src/app/api/faculty/route.ts`**

- POST: Creates faculty with hashed password directly (no User creation)
- GET: Returns faculty without password field
- Default password: `faculty123` if not provided

**`src/app/api/faculty/[id]/route.ts`**

- GET: Returns faculty without password
- PUT: Updates faculty, hashes password if changed, validates email uniqueness
- DELETE: Deletes faculty directly (no User deletion)

### 3. **UI Components**

#### Add Student Dialog (`src/components/admin/add-student-dialog.tsx`)

- Added `Email` field (required)
- Added `Password` field (optional, defaults to `student123`)
- Added email validation
- Removed auto-generated email from name

### 4. **What to Do Next**

#### Required Actions:

1. **Delete User Model**: Remove `src/models/User.ts` (no longer needed)
2. **Update Middleware** (`src/middleware.ts`): JWT tokens now include role directly from Student/Faculty
3. **Test Authentication**:
   - Admin login with `admin@sankalan.com` / `admin123`
   - Create students/faculty and test their login
4. **Database Migration**: If you have existing data, you'll need to:
   - Export existing students/faculty
   - Clear old User references
   - Re-create with new schema

#### Recommended Actions:

1. **Update Admin Credentials**: Store admin credentials securely (environment variables or Admin model)
2. **Password Reset**: Implement password reset functionality
3. **Profile Updates**: Allow students/faculty to update their own passwords
4. **Avatar Upload**: Implement avatar URL updates

### 5. **Security Notes**

- All passwords are hashed using bcrypt (10 rounds)
- Passwords are never returned in API responses (excluded with `.select('-password')`)
- Email uniqueness is enforced at model and API level
- JWT tokens expire after 7 days
- Role field is immutable (cannot be changed after creation)

### 6. **Default Credentials**

| Role    | Email                      | Password     |
| ------- | -------------------------- | ------------ |
| Admin   | admin@sankalan.com         | admin123     |
| Student | (created through admin UI) | student123\* |
| Faculty | (created through admin UI) | faculty123\* |

\*Default password can be customized during creation

### 7. **Migration Notes**

If you have existing data in the database with the old User model structure:

1. **Backup your database** first
2. **Option A**: Clear all data and start fresh
3. **Option B**: Write a migration script to:
   - Copy password from User to Student/Faculty
   - Add role field to Student/Faculty
   - Remove userId references
   - Delete User collection

### 8. **Testing Checklist**

- [ ] Admin can log in with hardcoded credentials
- [ ] Admin can create new students with custom email
- [ ] Admin can create new students with custom password
- [ ] Admin can create new faculty
- [ ] Students can log in with their credentials
- [ ] Faculty can log in with their credentials
- [ ] Password is not visible in API responses
- [ ] Email uniqueness is enforced
- [ ] Student/Faculty deletion works without errors
- [ ] Updating student/faculty doesn't break authentication

---

## Architecture Benefits

1. **Simplified Structure**: One model per entity type (Student, Faculty)
2. **Better Separation**: Admin is handled separately from regular users
3. **Cleaner Code**: No need to sync User and Student/Faculty models
4. **Easier Maintenance**: One source of truth for each user type
5. **Direct Queries**: Faster lookups without population
