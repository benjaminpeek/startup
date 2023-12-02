const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const recipeCollection = db.collection('recipes');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
  })().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  });

function addRecipe(recipe) {
    recipeCollection.insertOne(recipe);
}

function getRecipes(email) {
    let query = {
        "userEmail": email
    }
    const response = recipeCollection.find(query);
    return response.toArray();
}

// function deleteRecipes(email) {
//   recipeCollection.deleteMany({userEmail: email});
// }

module.exports = { addRecipe, getRecipes };