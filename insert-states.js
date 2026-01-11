import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const states = [
  { name: 'Andhra Pradesh', country: 'India' },
  { name: 'Arunachal Pradesh', country: 'India' },
  { name: 'Assam', country: 'India' },
  { name: 'Bihar', country: 'India' },
  { name: 'Chhattisgarh', country: 'India' },
  { name: 'Goa', country: 'India' },
  { name: 'Gujarat', country: 'India' },
  { name: 'Haryana', country: 'India' },
  { name: 'Himachal Pradesh', country: 'India' },
  { name: 'Jharkhand', country: 'India' },
  { name: 'Karnataka', country: 'India' },
  { name: 'Kerala', country: 'India' },
  { name: 'Madhya Pradesh', country: 'India' },
  { name: 'Maharashtra', country: 'India' },
  { name: 'Manipur', country: 'India' },
  { name: 'Meghalaya', country: 'India' },
  { name: 'Mizoram', country: 'India' },
  { name: 'Nagaland', country: 'India' },
  { name: 'Odisha', country: 'India' },
  { name: 'Punjab', country: 'India' },
  { name: 'Rajasthan', country: 'India' },
  { name: 'Sikkim', country: 'India' },
  { name: 'Tamil Nadu', country: 'India' },
  { name: 'Telangana', country: 'India' },
  { name: 'Tripura', country: 'India' },
  { name: 'Uttar Pradesh', country: 'India' },
  { name: 'Uttarakhand', country: 'India' },
  { name: 'West Bengal', country: 'India' },
];

async function insertStates() {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'sarita',
    port: parseInt(process.env.MYSQL_PORT || '3306'),
  });

  try {
    // First delete existing states
    await connection.execute('DELETE FROM states');
    console.log('Cleared existing states');

    // Insert all 28 states
    for (const state of states) {
      const [result] = await connection.execute(
        'INSERT INTO states (name, country) VALUES (?, ?)',
        [state.name, state.country]
      );
      console.log(`✓ Inserted: ${state.name}`);
    }

    console.log('\n✅ All 28 Indian states inserted successfully!');
  } catch (error) {
    console.error('Error inserting states:', error);
  } finally {
    await connection.end();
  }
}

insertStates();
