const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');

let database;

async function initDatabase(){
    database = await open({
        filename: path.resolve(__dirname, 'race_results.db'),
        driver: sqlite3.Database,
    });
    await database.run(`
        CREATE TABLE IF NOT EXISTS results (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              runnerId TEXT NOT NULL,
              finishTime TEXT NOT NULL,
              time TEXT NOT NULL
            )
        `);
        return database;
}


async function saveTimes(runnerId, finishTime){
    const time = new Date().toISOString();
    const result = await database.run(
        'INSERT INTO results (runnerId, finishTime, time) VALUES (?, ?, ?)',
        [runnerId, finishTime, time],
    );
    return result.lastID
}


async function orderedResults(){
    const rows = await database.all('SELECT * FROM results ORDER BY time ASC');
    return rows;
}
async function resetResults(){
   await database.run('DELETE FROM results')
}
    
module.exports = {
    initDatabase,
    saveTimes,
    orderedResults,
    resetResults,
};