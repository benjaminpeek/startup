const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const recipeCollection = db.collection('recipes');
const userCollection = db.collection('user');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
  })().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
});

async function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(name, email, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    name: name,
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

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

module.exports = { 
  getUser, 
  getUserByToken, 
  createUser, 
  addRecipe, 
  getRecipes
};