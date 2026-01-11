# MySQL Integration Setup Summary

## What I've Done

I've successfully integrated MySQL database support to your HealthFlow Hub application. Here's what was set up:

### 1. **Files Created**

#### Frontend Files:

- `src/integrations/mysql/client.ts` - MySQL connection client
- `src/integrations/mysql/types.ts` - TypeScript type definitions
- `src/hooks/use-mysql.ts` - React hook for API calls
- `MYSQL_SETUP.md` - Complete setup guide

#### Backend Files:

- `api/server.js` - Express API server for MySQL queries

#### Configuration Files:

- `.env` - Updated with MySQL credentials
- `.env.example` - Reference configuration file
- `supabase/sarita-mysql-schema.sql` - Database schema

### 2. **Database Configuration**

Your `.env` file now includes:

```env
VITE_MYSQL_HOST="localhost"
VITE_MYSQL_USER="root"
VITE_MYSQL_PASSWORD=""
VITE_MYSQL_DATABASE="sarita"
VITE_MYSQL_PORT="3306"
VITE_API_URL="http://localhost:5000/api"
```

**⚠️ UPDATE THESE VALUES** with your actual MySQL credentials!

### 3. **Database Schema**

The schema includes:

- `states` - Indian states
- `districts` - Districts within states
- `customers` - Customer information
- `patients` - Patient records
- `inward_registrations` - Hospital admissions
- `payments` - Payment records

### 4. **Installation**

All required packages have been installed:

- `mysql2` - MySQL client
- `express` - API server
- `cors` - Cross-origin support
- `dotenv` - Environment variables
- `concurrently` - Run multiple processes

### 5. **NPM Scripts**

New scripts added to `package.json`:

```bash
npm run dev          # Frontend only (port 8081)
npm run api          # API server only (port 5000)
npm run dev:all      # Both frontend and API together
```

## Next Steps

### Step 1: Set Up MySQL Database

Run this command to create the database and tables:

```bash
mysql -u root -p < supabase/sarita-mysql-schema.sql
```

Or use MySQL Workbench to execute the schema file.

### Step 2: Update Environment Variables

Edit `.env` with your MySQL credentials:

```env
VITE_MYSQL_HOST="localhost"
VITE_MYSQL_USER="your_username"
VITE_MYSQL_PASSWORD="your_password"
VITE_MYSQL_DATABASE="sarita"
VITE_MYSQL_PORT="3306"
```

### Step 3: Start Both Servers

```bash
npm run dev:all
```

This will start:

- Frontend: `http://localhost:8081`
- API Server: `http://localhost:5000/api`

### Step 4: Test the Connection

The API server will automatically test the MySQL connection when started. Look for:

- Console message: "API Server running on http://localhost:5000"
- API health check: Visit `http://localhost:5000/api/health`

## Using MySQL in Your App

### Example Component Using MySQL

```tsx
import { useMySQL } from "@/hooks/use-mysql";
import { useEffect, useState } from "react";

export default function PatientsList() {
  const { getPatients, loading } = useMySQL();
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    getPatients().then((data) => setPatients(data));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {patients.map((patient) => (
        <div key={patient.id}>{patient.full_name}</div>
      ))}
    </div>
  );
}
```

## Available API Endpoints

```
GET  /api/health                  - Check database connection
GET  /api/customers               - Get all customers
POST /api/customers               - Create new customer
GET  /api/patients                - Get all patients
POST /api/patients                - Create new patient
GET  /api/states                  - Get all states
GET  /api/districts/:stateId      - Get districts by state
```

## Files Structure

```
healthflow-hub-main/
├── api/
│   └── server.js                 # Express API server
├── src/
│   ├── integrations/
│   │   └── mysql/
│   │       ├── client.ts         # MySQL connection
│   │       └── types.ts          # Type definitions
│   ├── hooks/
│   │   └── use-mysql.ts          # React hook for MySQL
│   └── ...
├── supabase/
│   └── sarita-mysql-schema.sql   # Database schema
├── .env                          # Environment variables (UPDATE THIS)
├── MYSQL_SETUP.md                # Detailed setup guide
└── package.json                  # Updated with new scripts
```

## Important Notes

1. **Update `.env` file** - Replace default MySQL credentials with your actual database credentials
2. **Create database first** - Run the schema file before starting the app
3. **Both servers needed** - For full functionality, run both frontend and API server
4. **Port 5000** - Ensure it's not in use by other applications
5. **Firewall** - If accessing from another machine, ensure MySQL port (3306) is open

## Troubleshooting

### MySQL Connection Failed

- Check MySQL is running: `mysql -u root -p`
- Verify credentials in `.env`
- Check port 3306 is open

### API Server Won't Start

- Ensure MySQL database exists
- Check `.env` credentials
- Verify port 5000 is available

### Tables Not Found

- Run schema file again: `mysql -u root -p < supabase/sarita-mysql-schema.sql`
- Confirm tables: `mysql -u root -p -e "SHOW TABLES IN sarita;"`

## Support

Refer to `MYSQL_SETUP.md` for more detailed information and advanced configuration options.
