
import { Pool } from 'pg';
import 'dotenv/config';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false } 
});

// Force read-only mode for safety
pool.on('connect', (client) => {
  client.query('SET default_transaction_read_only = on');
});

export default pool;