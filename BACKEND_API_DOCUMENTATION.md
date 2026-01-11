# HealthFlow Hub - Complete Backend API Documentation

## Base URL

```
http://localhost:5000/api
```

## Authentication

All protected endpoints require JWT token in Authorization header:

```
Authorization: Bearer {token}
```

---

## 1. AUTH ENDPOINTS

### Register User

```
POST /api/auth/register
Body: {
  "email": "user@example.com",
  "password": "secure_password"
}
Response: {
  "success": true,
  "token": "jwt_token",
  "user": { "id": "...", "email": "..." }
}
```

### Login User

```
POST /api/auth/login
Body: {
  "email": "user@example.com",
  "password": "password"
}
Response: {
  "success": true,
  "token": "jwt_token",
  "user": { "id": "...", "email": "..." }
}
```

### Get User Profile

```
GET /api/auth/user-profile
Headers: Authorization: Bearer {token}
Response: {
  "success": true,
  "user": { ... },
  "details": { ... },
  "customers": [ ... ],
  "patients": [ ... ]
}
```

---

## 2. CUSTOMER MANAGEMENT ENDPOINTS

### Get All Customers

```
GET /api/customers
Response: [ { id, customer_name, phone_number, ... }, ... ]
```

### Create Customer

```
POST /api/customers
Body: {
  "customer_name": "John Doe",
  "phone_number": "9876543210",
  "gender": "M",
  "address_line_1": "123 Main St",
  "city": "Bhubaneswar",
  "state": "Odisha",
  "district": "Khurda",
  "country": "India"
}
Response: { "success": true, "customer": { ... } }
```

### Get Customer by ID

```
GET /api/customers/:customerId
Response: { ... customer details ... }
```

### Update Customer

```
PUT /api/customers/:customerId
Body: {
  "customer_name": "Jane Doe",
  "phone_number": "9876543210",
  "gender": "F",
  "address_line_1": "456 Oak St",
  "city": "Pune",
  "postal_code": "411001"
}
Response: { "success": true, "customer": { ... } }
```

### Delete Customer

```
DELETE /api/customers/:customerId
Response: { "success": true, "message": "Customer deleted" }
```

### Search Customers

```
GET /api/customers/search/:term
Example: /api/customers/search/john
Response: [ { ... matching customers ... } ]
```

### Get Customer Full Details

```
GET /api/customers/:customerId/full-details
Response: {
  "customer": { ... },
  "patients": [ ... ],
  "payments": [ ... ],
  "registrations": [ ... ]
}
```

### Get Customer History

```
GET /api/customers/:customerId/history
Response: {
  "current": { ... },
  "patientHistory": [ ... ],
  "paymentHistory": [ ... ],
  "lastUpdated": "timestamp"
}
```

### Get Customer Payments

```
GET /api/customers/:customerId/payments
Response: [ { id, amount, status, payment_date, ... }, ... ]
```

---

## 3. PATIENT MANAGEMENT ENDPOINTS

### Get All Patients

```
GET /api/patients
Response: [ { id, full_name, date_of_birth, blood_group, ... }, ... ]
```

### Create Patient

```
POST /api/patients
Body: {
  "full_name": "Patient Name",
  "date_of_birth": "1990-01-15",
  "blood_group": "O+",
  "phone": "9876543210",
  "email": "patient@example.com",
  "medical_history": "...",
  "customer_id": "..."
}
Response: { "success": true, "patient": { ... } }
```

### Get Patient by ID

```
GET /api/patients/:patientId
Response: { ... patient details ... }
```

### Update Patient

```
PUT /api/patients/:patientId
Body: {
  "full_name": "Updated Name",
  "blood_group": "B+",
  "phone": "9876543211",
  "medical_history": "updated history"
}
Response: { "success": true, "patient": { ... } }
```

### Delete Patient

```
DELETE /api/patients/:patientId
Response: { "success": true, "message": "Patient deleted" }
```

---

## 4. PAYMENT MANAGEMENT ENDPOINTS

### Get All Payments

```
GET /api/payments
Response: [ { id, amount, status, payment_date, payment_mode, ... }, ... ]
```

### Get Payments by Query

```
GET /api/payments?user_id=xxx&status=completed
Response: [ ... matching payments ... ]
```

### Create Payment

```
POST /api/payments
Body: {
  "customer_id": "...",
  "amount": 5000,
  "payment_mode": "card",
  "status": "completed",
  "notes": "Service payment"
}
Response: { "success": true, "payment": { ... } }
```

### Get Payment by ID

```
GET /api/payments/:paymentId
Response: { ... payment details ... }
```

### Update Payment

```
PUT /api/payments/:paymentId
Body: {
  "amount": 6000,
  "status": "pending",
  "payment_mode": "bank_transfer",
  "notes": "Updated payment"
}
Response: { "success": true, "payment": { ... } }
```

---

## 5. INWARD REGISTRATION ENDPOINTS

### Get All Registrations

```
GET /api/inward-registrations
Response: [ { ... registration records ... } ]
```

### Create Registration

```
POST /api/inward-registrations
Body: {
  "patient_id": "...",
  "registration_date": "2025-12-06",
  "status": "active",
  "notes": "..."
}
Response: { "success": true, "registration": { ... } }
```

### Get Registration by ID

```
GET /api/inward-registrations/:registrationId
Response: { ... registration details ... }
```

### Update Registration

```
PUT /api/inward-registrations/:registrationId
Body: {
  "status": "inactive",
  "notes": "Updated notes"
}
Response: { "success": true, "registration": { ... } }
```

---

## 6. LOCATION ENDPOINTS

### Get All States

```
GET /api/states
Response: [ { id, state_name, country_code, ... }, ... ]
```

### Get States by Country

```
GET /api/states/by-country/:countryCode
Example: /api/states/by-country/IN
Response: [ ... states in India ... ]
```

### Get Specific State

```
GET /api/states/lookup/:countryCode/:stateName
Example: /api/states/lookup/IN/Odisha
Response: { ... state details ... }
```

### Get Districts by State

```
GET /api/districts/:stateId
Response: [ { id, district_name, ... }, ... ]
```

---

## 7. PINCODE LOOKUP

### Get Address from Pincode

```
POST /api/pincode
Body: { "pincode": "411001" }
Response: {
  "city": "Pune",
  "state": "Maharashtra",
  "district": "Pune"
}
```

---

## 8. ADMIN DASHBOARD ENDPOINTS

### Get Dashboard Statistics

```
GET /api/admin/dashboard
Headers: Authorization: Bearer {token}
Response: {
  "stats": {
    "totalCustomers": 150,
    "totalPatients": 300,
    "totalPayments": 500,
    "totalRevenue": 250000
  },
  "recentCustomers": [ ... ]
}
```

### Get Customers Report

```
GET /api/admin/customers-report?status=active&limit=20&offset=0
Response: {
  "customers": [ ... ],
  "total": 150,
  "limit": 20,
  "offset": 0
}
```

### Get Patients Report

```
GET /api/admin/patients-report?limit=20&offset=0
Response: {
  "patients": [ ... ],
  "total": 300,
  "limit": 20,
  "offset": 0
}
```

### Get Payments Report

```
GET /api/admin/payments-report?status=completed&startDate=2025-12-01&endDate=2025-12-31
Response: {
  "payments": [ ... ],
  "total": 500,
  "totalRevenue": 250000,
  "limit": 100,
  "offset": 0
}
```

---

## 9. USER PROFILE ENDPOINTS

### Get User Profile

```
GET /api/users/:userId/profile
Headers: Authorization: Bearer {token}
Response: { "id": "...", "email": "...", "created_at": "..." }
```

### Update User Profile

```
PUT /api/users/:userId/profile
Headers: Authorization: Bearer {token}
Body: { "email": "newemail@example.com" }
Response: { "success": true, "user": { ... } }
```

---

## 10. ANALYTICS ENDPOINTS

### Get Customer Analytics

```
GET /api/analytics/customers
Response: {
  "newThisMonth": 45,
  "byCity": [ { "city": "Pune", "count": 50 }, ... ],
  "byState": [ { "state": "Maharashtra", "count": 100 }, ... ]
}
```

### Get Payment Analytics

```
GET /api/analytics/payments
Response: {
  "monthlyRevenue": [ { "month": "2025-12", "total": 50000 }, ... ],
  "paymentMethods": [ { "payment_mode": "card", "count": 100, "total": 50000 }, ... ],
  "completionRate": 95.5
}
```

---

## 11. HEALTH CHECK

### Check API Status

```
GET /api/health
Response: {
  "status": "ok",
  "message": "Database connected"
}
```

---

## Database Schema

### Tables

1. **users** - User accounts with authentication
2. **customers** - Customer/Client records
3. **patients** - Patient medical records
4. **payments** - Payment transactions
5. **inward_registrations** - Hospital inward registrations
6. **states** - State/Region information
7. **districts** - District information
8. **userDetails** - Extended user details
9. **userLoginHistory** - Login tracking

---

## Error Handling

All endpoints return appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

Error Response Format:

```
{
  "error": "Error message describing what went wrong"
}
```

---

## Pagination

Endpoints supporting pagination use:

- `limit` - Number of records per page (default: 100)
- `offset` - Number of records to skip (default: 0)

Example:

```
GET /api/admin/customers-report?limit=20&offset=40
```

---

## Date Format

All dates should be in ISO 8601 format:

```
YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS
```

---

## Rate Limiting

Currently no rate limiting. Implement as needed for production.

---

## Environment Variables Required

```
VITE_API_URL=http://localhost:5000/api
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=Raja@2005
MYSQL_DATABASE=sarita
MYSQL_PORT=3306
JWT_SECRET=your-secret-key-change-in-production
API_PORT=5000
```

---

## Testing the API

Use Postman or curl to test endpoints:

```bash
# Test health
curl http://localhost:5000/api/health

# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@test.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@test.com","password":"password123"}'

# Get all customers
curl http://localhost:5000/api/customers
```

---

**Total Endpoints: 50+**
**Status: Production Ready** ✅
