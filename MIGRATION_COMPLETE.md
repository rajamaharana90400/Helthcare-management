# Migration from Supabase to MySQL - Complete

## ✅ What Was Changed

### 1. **Removed Supabase**

- Removed all Supabase imports and dependencies
- Removed Supabase credentials from `.env`

### 2. **Added MySQL Authentication**

- Created new auth service: `src/integrations/auth/authService.ts`
- Handles user registration and login with MySQL
- Uses JWT tokens for session management
- Stores tokens in localStorage

### 3. **Updated Auth Component**

- `src/pages/Auth.tsx` now uses MySQL auth service
- No more Supabase dependency
- Works with your local MySQL "sarita" database

### 4. **Created Users Table**

- Added to MySQL schema: `supabase/sarita-mysql-schema.sql`
- Stores user credentials with bcrypt hashing
- Supports email and password authentication

### 5. **Updated API Server**

- Added authentication endpoints:
  - `POST /api/auth/register` - Create new user
  - `POST /api/auth/login` - Sign in user
- Uses bcryptjs for password hashing
- Generates JWT tokens for authenticated requests

### 6. **New Packages Installed**

- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT token generation
- `uuid` - Unique ID generation

## 🚀 Quick Start

### 1. Create the Database Schema

Run the MySQL schema file to create all tables including the users table:

```bash
mysql -u root -p < supabase/sarita-mysql-schema.sql
```

Or if using MySQL Workbench:

1. Open MySQL Workbench
2. File → Open SQL Script
3. Select `supabase/sarita-mysql-schema.sql`
4. Execute

### 2. Update .env with Your Credentials

Edit `.env` with your MySQL connection details:

```env
VITE_MYSQL_HOST="localhost"
VITE_MYSQL_USER="root"
VITE_MYSQL_PASSWORD="your_password"
VITE_MYSQL_DATABASE="sarita"
VITE_MYSQL_PORT="3306"

VITE_API_URL="http://localhost:5000/api"
API_PORT="5000"

JWT_SECRET="your-secret-key-change-in-production"
```

### 3. Start Both Servers

```bash
npm run dev:all
```

This will start:

- Frontend: `http://localhost:8081`
- API Server: `http://localhost:5000`

### 4. Create an Account

1. Visit `http://localhost:8081/auth`
2. Click "Sign Up"
3. Enter email and password (min 6 characters)
4. Account is created and you're signed in!

### 5. Use the App

After signing in, you can:

- Register customers
- Add patient details
- Manage inward registrations
- Track payments

## 📝 Key Features

### Authentication Flow

1. User signs up with email/password
2. Password is hashed using bcryptjs
3. User record created in MySQL `users` table
4. JWT token generated and stored in localStorage
5. Frontend uses token for authenticated requests
6. Token expires after 7 days

### Security

- Passwords are hashed with bcryptjs (10 salt rounds)
- JWT tokens stored in localStorage
- Token includes userId and email
- Token expires after 7 days
- All API requests validate tokens

## 🔄 File Structure

```
src/
├── integrations/
│   ├── auth/
│   │   └── authService.ts        # New: MySQL auth service
│   └── mysql/
│       ├── client.ts
│       └── types.ts
├── pages/
│   └── Auth.tsx                  # Updated: Uses MySQL auth
└── ...

api/
└── server.js                      # Updated: Added auth endpoints

supabase/
└── sarita-mysql-schema.sql       # Updated: Added users table
```

## 📚 API Endpoints

### Authentication

- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Sign in

### Data Management

- `GET /api/customers` - Get all customers
- `POST /api/customers` - Create customer
- `GET /api/patients` - Get all patients
- `POST /api/patients` - Create patient
- `GET /api/states` - Get all states
- `GET /api/districts/:stateId` - Get districts

## ⚠️ Important Notes

1. **Change JWT_SECRET in production** - The default secret should be changed before deploying
2. **Update .env credentials** - Use your actual MySQL password
3. **Backend must run** - Both frontend and API server are needed
4. **Database must exist** - Run the schema file first
5. **Token expires** - Users will need to sign in again after 7 days

## 🧪 Testing

### Create Test Account

```
Email: testuser@example.com
Password: test123
```

### Login with Test Account

1. Go to Sign In tab
2. Enter email and password
3. Click "Sign In"
4. You should be redirected to home page

## 🐛 Troubleshooting

### "Invalid email or password"

- Ensure user exists in database
- Check password is correct
- Verify MySQL is running

### "API not responding"

- Check API server is running: `npm run api`
- Verify port 5000 is available
- Check MySQL connection in API server console

### "Cannot create account"

- Check email isn't already in use
- Verify database schema is created
- Check MySQL credentials in .env

## 📞 Support

Refer to `MYSQL_SETUP.md` for detailed MySQL setup instructions.
