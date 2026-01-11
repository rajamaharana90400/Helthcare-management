import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const odishaDistricts = [
  'Angul',
  'Balangir',
  'Balasore',
  'Bargarh',
  'Bhadrak',
  'Boudh',
  'Cuttack',
  'Debagarh',
  'Dhenkanal',
  'Gajapati',
  'Ganjam',
  'Jagatsinghpur',
  'Jajpur',
  'Jharsuguda',
  'Kalahandi',
  'Kandhamal',
  'Kendrapara',
  'Keonjhar',
  'Khordha',
  'Koraput',
  'Malkangiri',
  'Mayurbhanj',
  'Nabarangpur',
  'Nayagarh',
  'Nuapada',
  'Puri',
  'Rayagada',
  'Sambalpur',
  'Subarnapur',
  'Sundargarh'
];

async function insertOdishaDistricts() {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'sarita',
    port: parseInt(process.env.MYSQL_PORT || '3306'),
  });

  try {
    // Get Odisha state ID
    const [states] = await connection.execute('SELECT id FROM states WHERE name = ?', ['Odisha']);
    
    if (states.length === 0) {
      console.error('❌ Odisha state not found in database');
      process.exit(1);
    }

    const odishaStateId = states[0].id;
    console.log(`✓ Found Odisha state ID: ${odishaStateId}\n`);

    // Delete existing Odisha districts
    await connection.execute('DELETE FROM districts WHERE state_id = ?', [odishaStateId]);
    console.log('Cleared existing Odisha districts\n');

    // Insert all Odisha districts
    for (const district of odishaDistricts) {
      await connection.execute(
        'INSERT INTO districts (name, state_id) VALUES (?, ?)',
        [district, odishaStateId]
      );
      console.log(`✓ Inserted: ${district}`);
    }

    console.log(`\n✅ All ${odishaDistricts.length} Odisha districts inserted successfully!`);
  } catch (error) {
    console.error('❌ Error inserting districts:', error.message);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

insertOdishaDistricts();
