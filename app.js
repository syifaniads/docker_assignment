const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

// Database configuration using environment variables
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});

// Create a table if it doesn't exist
pool.query(
  'CREATE TABLE IF NOT EXISTS visits (id SERIAL PRIMARY KEY, date TIMESTAMP DEFAULT CURRENT_TIMESTAMP)',
  (err) => {
    if (err) {
      console.error('Error creating table', err);
    } else {
      console.log('Table created or already exists');
    }
  }
);

app.get('/', async (req, res) => {
  try {
    // Record visit
    await pool.query('INSERT INTO visits(date) VALUES(CURRENT_TIMESTAMP)');
    
    // Get visit count
    const result = await pool.query('SELECT COUNT(*) FROM visits');
    const visitCount = result.rows[0].count;
    
    res.send(`<h1>Docker App</h1><p>This page has been visited ${visitCount} times.</p>`);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).send('Database error');
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
