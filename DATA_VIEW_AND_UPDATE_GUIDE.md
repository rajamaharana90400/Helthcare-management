# HealthFlow Hub - Data Viewing & Update Guide

## Overview

This guide explains how to view all data and how customers can update their information and view previous data after login.

---

## 1. USER LOGIN & PROFILE ACCESS

### Step 1: Login

```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com"
  }
}
```

### Step 2: Save the Token

Store the token in localStorage:

```javascript
localStorage.setItem("authToken", token);
```

---

## 2. VIEW COMPLETE USER PROFILE (After Login)

### Get User Profile with All Associated Data

```
GET /api/auth/user-profile
Headers: {
  "Authorization": "Bearer {token}"
}

Response:
{
  "success": true,
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "created_at": "2025-12-05T10:00:00Z"
  },
  "details": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "full_name": "Rajesh Kumar",
    "phone_number": "9876543210",
    "role": "customer",
    "department": null,
    "qualification": null,
    "experience_years": 0,
    "is_active": true
  },
  "customers": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440002",
      "customer_name": "Rajesh Kumar",
      "phone_number": "9876543210",
      "address_line_1": "123 Main Street",
      "city": "Delhi",
      "state_id": "...",
      "district_id": "...",
      "created_at": "2025-12-05T10:00:00Z",
      "updated_at": "2025-12-05T10:00:00Z"
    }
  ],
  "patients": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440003",
      "full_name": "Rajesh Kumar",
      "date_of_birth": "1975-03-15",
      "age": 49,
      "gender": "Male",
      "blood_group": "O+",
      "phone": "9876543210",
      "email": "rajesh@example.com",
      "address": "123 Main Street, New Delhi",
      "medical_history": "Diabetes, Hypertension",
      "emergency_contact_name": "Priya Kumar",
      "emergency_contact_phone": "9876543211"
    }
  ]
}
```

---

## 3. VIEW ALL USER DATA BY USER ID

### Get Comprehensive User Data

```
GET /api/users/{userId}/all-data

Response includes:
- User basic info
- User details (name, phone, role)
- All customers associated with user
- All patients associated with user
- Inward registrations
- Payments
- Login history (last 10 logins)
```

Example:

```javascript
const userId = "550e8400-e29b-41d4-a716-446655440000";
fetch(`/api/users/${userId}/all-data`)
  .then((res) => res.json())
  .then((data) => {
    console.log("All User Data:", data);
    console.log("Customers:", data.customers);
    console.log("Patients:", data.patients);
    console.log("Login History:", data.loginHistory);
  });
```

---

## 4. CUSTOMER VIEW & UPDATE THEIR OWN INFORMATION

### View Customer Full Details (with History)

```
GET /api/customers/{customerId}/full-details

Response:
{
  "success": true,
  "customer": {
    "id": "550e8400-e29b-41d4-a716-446655440002",
    "customer_name": "Rajesh Kumar",
    "phone_number": "9876543210",
    "gender": "Male",
    "address_line_1": "123 Main Street",
    "address_line_2": "Apt 4",
    "city": "Delhi",
    "postal_code": "110001",
    "country": "IN",
    "state": "Delhi",
    "district": "Central Delhi",
    "created_at": "2025-12-05T10:00:00Z",
    "updated_at": "2025-12-05T10:00:00Z"
  },
  "userDetails": {
    "full_name": "Rajesh Kumar",
    "phone_number": "9876543210",
    "role": "customer"
  },
  "patients": [
    { ... patient data ... }
  ],
  "payments": [
    { ... payment data ... }
  ]
}
```

### Update Customer Information

```
PUT /api/customers/{customerId}
Content-Type: application/json

{
  "customer_name": "Rajesh Kumar Singh",
  "phone_number": "9876543211",
  "address_line_1": "456 Oak Avenue",
  "city": "New Delhi",
  "postal_code": "110002"
}

Response:
{
  "success": true,
  "message": "Customer updated successfully",
  "customer": {
    "id": "550e8400-e29b-41d4-a716-446655440002",
    "customer_name": "Rajesh Kumar Singh",
    "phone_number": "9876543211",
    "address_line_1": "456 Oak Avenue",
    "city": "New Delhi",
    "postal_code": "110002",
    "updated_at": "2025-12-05T14:30:00Z"
  }
}
```

Example in JavaScript:

```javascript
const customerId = "550e8400-e29b-41d4-a716-446655440002";
const updatedData = {
  customer_name: "Rajesh Kumar Singh",
  phone_number: "9876543211",
  address_line_1: "456 Oak Avenue",
  city: "New Delhi",
};

fetch(`/api/customers/${customerId}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(updatedData),
})
  .then((res) => res.json())
  .then((data) => {
    if (data.success) {
      console.log("Customer updated successfully!");
      console.log("New data:", data.customer);
    }
  });
```

---

## 5. VIEW CUSTOMER HISTORY (Previous Data)

### Get Customer Update History

```
GET /api/customers/{customerId}/history

Response:
{
  "success": true,
  "current": {
    "id": "550e8400-e29b-41d4-a716-446655440002",
    "customer_name": "Rajesh Kumar Singh",
    "phone_number": "9876543211",
    "city": "New Delhi",
    "updated_at": "2025-12-05T14:30:00Z"
  },
  "patientHistory": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440003",
      "full_name": "Rajesh Kumar",
      "medical_history": "Diabetes, Hypertension",
      "updated_at": "2025-12-04T10:00:00Z"
    }
  ],
  "paymentHistory": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440004",
      "amount": 5000,
      "status": "completed",
      "payment_date": "2025-12-03"
    }
  ],
  "lastUpdated": "2025-12-05T14:30:00Z"
}
```

---

## 6. ADMIN VIEWS - SEE ALL DATA

### Get All Customers (Admin)

```
GET /api/admin/all-customers

Returns all customers with user details
```

### Get All Patients (Admin)

```
GET /api/admin/all-patients

Returns all patients with associated user info
```

### Search Customers

```
GET /api/customers/search/{searchTerm}

Example: /api/customers/search/Rajesh
Returns customers matching name, phone, or email
```

---

## 7. FRONTEND IMPLEMENTATION EXAMPLE

### Login & Show Profile

```javascript
async function loginAndShowProfile() {
  // Step 1: Login
  const loginResponse = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "user@example.com",
      password: "password123",
    }),
  });

  const loginData = await loginResponse.json();
  const token = loginData.token;

  // Save token
  localStorage.setItem("authToken", token);

  // Step 2: Get user profile
  const profileResponse = await fetch("/api/auth/user-profile", {
    headers: { Authorization: `Bearer ${token}` },
  });

  const profileData = await profileResponse.json();

  // Step 3: Display data
  console.log("User:", profileData.user);
  console.log("Details:", profileData.details);
  console.log("Customers:", profileData.customers);
  console.log("Patients:", profileData.patients);

  return profileData;
}
```

### Update Customer Info

```javascript
async function updateCustomerInfo(customerId, updateData) {
  const response = await fetch(`/api/customers/${customerId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateData),
  });

  const result = await response.json();

  if (result.success) {
    console.log("Updated successfully!");
    console.log("New info:", result.customer);
  } else {
    console.error("Update failed:", result.error);
  }

  return result;
}

// Usage
updateCustomerInfo(customerId, {
  customer_name: "New Name",
  phone_number: "9999999999",
  city: "New City",
});
```

### View Previous Data

```javascript
async function viewCustomerHistory(customerId) {
  const response = await fetch(`/api/customers/${customerId}/history`);
  const history = await response.json();

  console.log("Current Data:", history.current);
  console.log("Patient History:", history.patientHistory);
  console.log("Payment History:", history.paymentHistory);
  console.log("Last Updated:", history.lastUpdated);

  return history;
}
```

---

## 8. FLOW DIAGRAM

```
Customer Workflow:
1. Register → /api/auth/register
2. Login → /api/auth/login (get token)
3. View Profile → /api/auth/user-profile (with token)
4. View Full Details → /api/customers/{id}/full-details
5. Update Info → PUT /api/customers/{id}
6. View History → /api/customers/{id}/history
7. View Patients → GET /api/patients?user_id={userId}
8. View Payments → GET /api/payments?user_id={userId}

Admin Workflow:
1. View All Customers → /api/admin/all-customers
2. View All Patients → /api/admin/all-patients
3. Search Customers → /api/customers/search/{term}
4. View Any User Data → /api/users/{userId}/all-data
```

---

## 9. KEY FEATURES

✅ **Complete Profile View** - See all associated data after login
✅ **Update Information** - Customers can update their own data
✅ **History Tracking** - View previous data with timestamps
✅ **Patient Records** - Link patients to customer accounts
✅ **Payment Tracking** - View all payments and status
✅ **Login History** - Track last 10 login attempts
✅ **Admin Dashboard** - View all customers and patients
✅ **Search Functionality** - Find customers quickly
✅ **Audit Trail** - All updates timestamped

---

## 10. DATABASE TABLES INVOLVED

- `users` - Base user accounts
- `userDetails` - Extended user profile
- `customers` - Customer information
- `patients` - Patient medical records
- `userLoginHistory` - Login tracking
- `payments` - Payment records
- `inward_registrations` - Hospital admissions
