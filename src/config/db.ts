import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();


const pool = new Pool({
  connectionString: process.env.NEON_URI,
  
});

export const connectDB = async () => {
  try {
    const client = await pool.connect();

    console.log('✅ Neon PostgreSQL Connected');

    client.release();  
  } catch (error) {
    console.error('❌ Database connection failed');
    console.error(error);

    process.exit(1);
  }
};

export default pool;