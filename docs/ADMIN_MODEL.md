# Authentication System - Admin Model Added

## Overview

The authentication system now includes a dedicated `Admin` model, completing the refactor to remove the separate `User` model. All authentication is now handled through role-specific models: `Admin`, `Student`, and `Faculty`.

## Models

### 1. **Admin Model** (`src/models/Admin.ts`) - NEW ✨

- `adminId`: Unique identifier (e.g., ADM2025001)
- `name`: Admin's full name
- `email`: Unique email address
- `password`: Hashed password (bcrypt)
- `role`: Always 'admin' (immutable)
- `phone`: Optional phone number
- `avatarUrl`: Optional profile picture URL
- Timestamps: `createdAt`, `updatedAt`

### 2. **Student Model** (`src/models/Student.ts`)

- `studentId`: Unique identifier (e.g., STU20250001)
- `password`: Hashed password
- `role`: Always 'student' (immutable)
- `avatarUrl`: Optional profile picture
- All student-specific fields (course, marks, etc.)

### 3. **Faculty Model** (`src/models/Faculty.ts`)

- `facultyId`: Unique identifier (e.g., FAC2025001)
- `password`: Hashed password
- `role`: Always 'faculty' (immutable)
- `avatarUrl`: Optional profile picture
- All faculty-specific fields (designation, expertise, etc.)

## Authentication Flow

### Login API (`src/app/api/auth/login/route.ts`)

The login system checks all three models in order:

1. **Admin** collection first
2. **Student** collection if not admin
3. **Faculty** collection if not student

All passwords are verified using bcrypt and JWT tokens include:

- `userId`: Database ID
- `email`: User's email
- `role`: 'admin', 'student', or 'faculty'
- `name`: User's full name

## Admin Management API

### Admin Routes (`src/app/api/admin/`)

#### GET `/api/admin`

- List all admins (paginated)
- Search by name, email, or adminId
- Excludes password from response

#### POST `/api/admin`

- Create new admin
- Auto-generates adminId
- Default password: 'admin123'
- Email uniqueness enforced

#### GET `/api/admin/[id]`

- Get single admin by ID
- Excludes password

#### PUT `/api/admin/[id]`

- Update admin details
- Hash password if changed
- Validate email uniqueness

#### DELETE `/api/admin/[id]`

- Delete admin account
- **Safety**: Prevents deletion of last admin

## Initial Setup

### Seeding Demo Data

To reset the database and seed all demo users (admins, faculty, and students), run:

```bash
npm run seed:demo
```

This command removes existing records from the `Admin`, `Faculty`, `Student`, `Class`, `Activity`, and `Placement` collections before inserting fresh demo data across the platform.

### Seeding the First Admin Only

If you only need to create or refresh the default admin account, run:

```bash
npm run seed:admin
```

The seed scripts create:

- **Email**: admin@sankalan.com
- **Password**: admin123
- **AdminId**: ADM2025001
- **Name**: System Administrator

The script checks if an admin already exists to prevent duplicates.

## Security Features

### Password Security

- All passwords hashed with bcrypt (10 rounds)
- Passwords never returned in API responses
- Password updates require hashing

### Email Validation

- Emails stored in lowercase
- Uniqueness enforced at model and API level
- Duplicate check excludes current user on update

### Role Protection

- Role field is immutable (cannot be changed)
- Role automatically set on creation
- JWT tokens include role for authorization

### Admin Protection

- Cannot delete the last admin account
- Prevents system lockout

## API Client Integration

Add these methods to `src/lib/api-client.ts`:

```typescript
// Admin management
async createAdmin(data: any) {
  return this.request('/api/admin', 'POST', data);
}

async getAdmins(params?: any) {
  return this.request('/api/admin', 'GET', undefined, params);
}

async getAdmin(id: string) {
  return this.request(`/api/admin/${id}`, 'GET');
}

async updateAdmin(id: string, data: any) {
  return this.request(`/api/admin/${id}`, 'PUT', data);
}

async deleteAdmin(id: string) {
  return this.request(`/api/admin/${id}`, 'DELETE');
}
```

## Default Credentials

| Role    | Creation Method                            | Default Password |
| ------- | ------------------------------------------ | ---------------- |
| Admin   | `npm run seed:demo` / `npm run seed:admin` | admin123         |
| Student | Admin panel                                | student123       |
| Faculty | Admin panel                                | faculty123       |

⚠️ **Important**: Change default passwords after first login!

## Migration from Previous Version

If you had the hardcoded admin credentials:

1. Run the seed script: `npm run seed:admin`
2. Test login with admin@sankalan.com / admin123
3. The old User model can now be safely deleted
4. Update any references to hardcoded credentials

## Testing Checklist

- [x] Admin seed script creates admin successfully
- [x] Admin can log in with seeded credentials
- [x] Admin API routes work (GET, POST, PUT, DELETE)
- [x] Cannot delete last admin (safety check)
- [x] Email uniqueness enforced across all models
- [x] Passwords are hashed and excluded from responses
- [x] JWT tokens include correct role
- [x] Students and faculty can still log in
- [ ] Multiple admins can be created
- [ ] Admin password can be changed
- [ ] Admin profile can be updated

## Architecture Benefits

1. **Consistency**: All user types follow the same pattern
2. **Flexibility**: Each role has its own model with role-specific fields
3. **Security**: No hardcoded credentials in code
4. **Scalability**: Easy to add more admins
5. **Maintainability**: Single source of truth per role
6. **Safety**: Last admin deletion prevention

## Next Steps

1. **Run seed script**: `npm run seed:admin`
2. **Test login**: Use admin@sankalan.com / admin123
3. **Create admin UI**: Add admin management in admin panel
4. **Implement password reset**: Add forgot password feature
5. **Add profile pages**: Allow users to update their own info
6. **Avatar uploads**: Implement file upload for avatarUrl
7. **Audit logging**: Track admin actions for security

---

**Note**: The User model (`src/models/User.ts`) is now obsolete and can be deleted.
