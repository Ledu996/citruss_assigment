const db = require('../config/database/connection');
const fs = require('fs').promises;
const path = require('path');

async function runMigrations () {
    const fileNames = [
        'createUsers.sql', 
        'createDeposits.sql', 
        'createGames.sql',
        'createPurchases.sql',
    ]
    try {
        for (let i = 0; i < fileNames.length; i++) {
            const sqlFilePath = path.join(__dirname, 'files', `${fileNames[i]}`);
            const data = await fs.readFile(sqlFilePath, 'utf8'); 
            await db.query(data)
        }
        console.log('Migrations successfully executed');
        return process.exit(1)
    } catch (err) {
        return process.exit(1)
    }
}

runMigrations();