import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config(); 

// Create a pool for managing connections
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Promisify the pool to support async/await
const promisePool = pool.promise();

// Function to execute queries asynchronously
async function query(sql, params) {
    try {
        const [rows, fields] = await promisePool.query(sql, params);
        return rows; // Return just the rows
    } catch (error) {
        console.error('Error in executing MySQL query: ', error);
        throw error; // Rethrow or handle as needed
    }
}

export default { query };
