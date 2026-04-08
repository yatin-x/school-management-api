import pool from './db.js';

async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS schools (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      latitude FLOAT NOT NULL,
      longitude FLOAT NOT NULL
    )
  `);
  console.log('✅ Schools table ready');
  process.exit(0);
}

initDB().catch(err => {
  console.error('❌ DB init failed:', err.message);
  process.exit(1);
});