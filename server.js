const express = require('express');
const cors = require('cors');
const parser = require('body-parser');
const database = require('./db')

const server = express();
const PORT = process.env.PORT || 8080;

server.use(cors());
server.use(parser.json());
(async () => {await database.initDatabase();})();

server.post('/results', async (req, res) =>{
    try{
        const {runnerId, finishTime} = req.body;
        if (!runnerId || !finishTime){
            return res.status(400).json({ error: 'Missing the runnerId or the finishing time'});
        }
        const id = await database.saveTimes(runnerId, finishTime);
        res.status(201).json({ message: 'Saved The Runners Results!', id});
    } catch (err){
        console.error('Issue saving current results', err);
        res.status(500).json({ error: 'Unable to save current results!'})
    }
})

server.get('/results', async (req, res) => {
    try{
        const results = await database.orderedResults();
        res.json(results);
    } catch (err) {
        console.error('Error While Fetching The Results!:', err);
        res.status(500).json({ error: 'Failed to fetch results'});
    }
});

server.delete('/results', async (req, res) => {
    try{
        await database.resetResults();
        res.json({ message: 'Results have been successfully cleared!'});
    } catch (err){
        console.error({ message: 'Unable To Clear Current Results!:', err});
        res.status(500).json({ error: 'Failure to clear results'});
    }
});

server.listen(PORT, () => {
    console.log(`Server Is Currently Running on http://localhost:${PORT}`);
});