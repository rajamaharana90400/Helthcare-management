# MySQL Database Setup Guide

This document explains how to set up and connect the MySQL database "sarita" to your HealthFlow Hub application.

## Prerequisites

1. **MySQL Server** installed and running (version 5.7 or higher)
2. **Node.js** and npm installed
3. **MySQL Workbench** or MySQL command-line client (optional, for manual setup)

## Setup Steps

### 1. Create the Database and Tables

#### Option A: Using MySQL Command Line

1. Open MySQL command line client or MySQL Workbench
2. Run the schema file to create the database and tables:

```bash
mysql -u root -p < supabase/sarita-mysql-schema.sql
```

Or, open the file `supabase/sarita-mysql-schema.sql` and execute it in your MySQL client.

#### Option B: Using MySQL Workbench

1. Open MySQL Workbench
2. Connect to your MySQL server
3. File → Open SQL Script → Select `supabase/sarita-mysql-schema.sql`
4. Execute the script (Ctrl+Shift+Enter or click the lightning bolt icon)

### 2. Configure Environment Variables

Update your `.env` file with your MySQL connection details:

```env
VITE_MYSQL_HOST="localhost"
VITE_MYSQL_USER="root"
VITE_MYSQL_PASSWORD="your_password"
VITE_MYSQL_DATABASE="sarita"
VITE_MYSQL_PORT="3306"

VITE_API_URL="http://localhost:5000/api"
API_PORT="5000"
```

### 3. Install Dependencies

All required packages should already be installed, but if needed:

```bash
npm install
```

### 4. Start the Application

#### Option A: Run Only Frontend (using Supabase)

```bash
npm run dev
```

Access the app at: `http://localhost:8081`

#### Option B: Run Frontend + API Server (using MySQL)

```bash
npm run dev:all
```

This will start:

- Frontend at: `http://localhost:8081`
- API Server at: `http://localhost:5000`

#### Option C: Run Servers Separately

Terminal 1 (Frontend):

```bash
npm run dev
```

Terminal 2 (API Server):

```bash
npm run api
```

## Using MySQL in Your Components

### Example: Fetch Customers

```tsx
import { useMySQL } from "@/hooks/use-mysql";
import { useEffect, useState } from "react";

export default function CustomersPage() {
  const { getCustomers, loading } = useMySQL();
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    getCustomers().then((data) => setCustomers(data));
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {customers.map((customer) => (
        <div key={customer.id}>{customer.customer_name}</div>
      ))}
    </div>
  );
}
```

### Example: Create a Customer

```tsx
import { useMySQL } from "@/hooks/use-mysql";

export default function AddCustomer() {
  const { createCustomer } = useMySQL();

  const handleSubmit = async (data) => {
    await createCustomer({
      customer_name: "John Doe",
      address_line_1: "123 Main St",
      city: "Mumbai",
      postal_code: "400001",
      gender: "Male",
      phone_number: "9876543210",
      user_id: "user-uuid",
    });
  };

  return <button onClick={handleSubmit}>Add Customer</button>;
}
```

## Available API Endpoints

### Health Check

- **GET** `/api/health` - Check if database is connected

### Customers

- **GET** `/api/customers` - Get all customers
- **POST** `/api/customers` - Create a new customer

### Patients

- **GET** `/api/patients` - Get all patients
- **POST** `/api/patients` - Create a new patient

### States & Districts

- **GET** `/api/states` - Get all states
- **GET** `/api/districts/:stateId` - Get districts for a specific state

## Database Schema

### Tables

1. **states** - Indian states
2. **districts** - Districts within states
3. **customers** - Customer information
4. **patients** - Patient medical records
5. **inward_registrations** - Hospital admissions
6. **payments** - Payment records

### Relationships

```
states (1) ← (many) districts
        ↓
        customers

patients ← inward_registrations → customers
        ↓
        payments
```

## Troubleshooting

### "Cannot connect to MySQL"

- Ensure MySQL server is running
- Check `.env` credentials (host, user, password, port)
- Verify the database name is "sarita"

### "API Server not responding"

- Ensure the API server is running: `npm run api`
- Check that port 5000 is not in use

### "Tables not found"

- Run the schema setup again: `mysql -u root -p < supabase/sarita-mysql-schema.sql`
- Verify tables exist: `SHOW TABLES IN sarita;`

### "Permission denied"

- Check MySQL user permissions
- May need to grant privileges: `GRANT ALL ON sarita.* TO 'root'@'localhost';`

## Type Definitions

TypeScript types are defined in `src/integrations/mysql/types.ts`:

- `Customer`
- `Patient`
- `InwardRegistration`
- `Payment`
- `State`
- `District`

## Additional Commands

```bash
# Test MySQL connection
npm run api

# Run frontend only
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Notes

- All timestamps are stored in UTC
- UUIDs are used for all ID fields
- Row-level security is not enforced at the database level (can be added if needed)
- The API server should run on the same machine or accessible network
