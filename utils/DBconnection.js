import mysql from 'mysql2';

// Create a pool for managing connections
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    database: process.env.DB_DATABASE || 'library_db',
    password: process.env.DB_PASSWORD || 'MBworld1',
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
