const express = require('express');
const cron = require('node-cron');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// In-memory storage for example purposes (replace with a database in production)
let pokemons = {};

app.post('/adopt', (req, res) => {
    const { name, health } = req.body;
    // Store Pokémon data with last fed time
    pokemons[name] = { health, isAdopted: true, lastFed: new Date() };
    res.send(`Pokemon ${name} adopted successfully!`);
});

app.post('/feed', (req, res) => {
    const { name } = req.body;
    if (pokemons[name]) {
        pokemons[name].lastFed = new Date();
        res.send(`Pokemon ${name} has been fed.`);
    } else {
        res.status(404).send(`Pokemon ${name} not found.`);
    }
});

// Health decrease task
cron.schedule('0 * * * *', () => { // Every hour
    const now = new Date();
    for (let name in pokemons) {
        if (pokemons[name].isAdopted) {
            const lastFed = new Date(pokemons[name].lastFed);
            const hoursSinceLastFed = (now - lastFed) / (1000 * 60 * 60);
            if (hoursSinceLastFed >= 12) {
                pokemons[name].health = Math.max(pokemons[name].health - 5, 0);
                pokemons[name].lastFed = now; // Update last fed to prevent multiple deductions
                console.log(`Decreased health of ${name} to ${pokemons[name].health}`);
            }
        }
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
