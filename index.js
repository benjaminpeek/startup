require('dotenv').config();
const express = require('express');
const app = express();
const DB = require('./database.js');

const apiKey = process.env.APIKEY;

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// GetRecipes from my backend, which calls on the third party
apiRouter.get('/recipes', (_req, res) => {
  fetch(`https://api.spoonacular.com/recipes/random?number=4&apiKey=${apiKey}`)
    .then((response) => response.json())
    .then((data) => res.send(data))
});

// SubmitRecipe
apiRouter.post('/recipe', async (req, res) => {
  DB.addRecipe(req.body);
  res.status(200);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

let recipes = [];