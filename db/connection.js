const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: 'FartFace15%',
        database: 'election',
    },
    console.log('Connected to the electon database.')
);

module.exports = db;