# 🚀 Quick Start - MySQL Setup & Run

## ✅ Prerequisites

- MySQL Server running (v5.7+)
- Node.js & npm installed
- 2 terminal windows open

## 📋 4-Step Setup

### Step 1: Create Database (1 minute)

Open MySQL command line or Workbench and run:

```bash
mysql -u root -p < supabase/sarita-mysql-schema.sql
```

Or use MySQL Workbench:

1. File → Open SQL Script
2. Select `supabase/sarita-mysql-schema.sql`
3. Execute

### Step 2: Configure Environment (1 minute)

Edit `.env` file with your MySQL password:

```env
VITE_MYSQL_HOST="localhost"
VITE_MYSQL_USER="root"
VITE_MYSQL_PASSWORD="YOUR_MYSQL_PASSWORD"  ← Change this
VITE_MYSQL_DATABASE="sarita"
VITE_MYSQL_PORT="3306"

VITE_API_URL="http://localhost:5000/api"
API_PORT="5000"
```

### Step 3: Install Packages (2 minutes)

```bash
npm install
```

Already done? Skip this step.

### Step 4: Start Application (1 minute)

**Terminal 1** - Start Frontend:

```bash
npm run dev
```

**Terminal 2** - Start API Server:

```bash
npm run api
```

Or **One Terminal** - Start Both:

```bash
npm run dev:all
```

## 🌐 Access Your App

- **Frontend**: http://localhost:8081
- **API Server**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

## 👤 Create Your First Account

1. Go to http://localhost:8081/auth
2. Click "Sign Up"
3. Enter email: `testuser@example.com`
4. Enter password: `test123456` (min 6 chars)
5. Click "Create Account"
6. You're in! 🎉

## 📝 Create Test Data

After logging in, you can:

- Register a customer
- Add patient details
- Add hospital admissions
- Track payments

## 🛠️ Common Commands

```bash
npm run dev          # Frontend only
npm run api          # API server only
npm run dev:all      # Both (recommended)
npm run build        # Build for production
npm run lint         # Check code quality
```

## ⚠️ If Something Goes Wrong

### "Cannot connect to MySQL"

- Check MySQL is running
- Verify credentials in `.env`
- Run: `mysql -u root -p -e "SELECT 1;"`

### "API not responding"

- Check API server is running
- Verify port 5000 is free: `netstat -ano | findstr :5000`

### "Tables not found"

- Re-run schema: `mysql -u root -p < supabase/sarita-mysql-schema.sql`
- Check: `mysql -u root -p -e "SHOW TABLES IN sarita;"`

### "Port already in use"

- Frontend (8081): Try port 8082
- API (5000): Try port 5001

## 📞 Documentation

- **Full Setup**: `MYSQL_SETUP.md`
- **Migration Details**: `MIGRATION_COMPLETE.md`
- **Complete Overview**: `SUPABASE_REMOVED_MYSQL_READY.md`

## ✨ Features Ready to Use

✅ User registration and login
✅ Customer management
✅ Patient records
✅ Hospital admissions
✅ Payment tracking
✅ State and district selection

---

**That's it!** Your MySQL-powered HealthFlow Hub is ready. 🎉

**Questions?** Check the documentation files or review the source code.
