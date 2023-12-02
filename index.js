require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
const DB = require('./database.js');
const { MongoDBCollectionNamespace } = require('mongodb');

const apiKey = process.env.APIKEY;

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json({limit: '50mb'}));

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

// Get user's recipes
apiRouter.get(`/user_recipes/:userEmail`, async (_req, res) => {
  console.log("get endpoint hit");
  const email = _req.params.userEmail;
  const response = await DB.getRecipes(email);
  console.log("status ok");
  res.send(response);
});

// SubmitRecipe
apiRouter.post('/recipe', (req, res) => {
  console.log("post endpoint hit");
  DB.addRecipe(req.body);
  console.log("status ok post");
  res.status(200).send(req.body);
});

// Delete recipes
// apiRouter.delete(`/delete/:userEmail`, async (req, res) => {
//   console.log(req.params.userEmail);
//   res.status(200);
//   res.send("done");
//   const result = await DB.deleteRecipes(req.params.userEmail);
//   res.send(result);
// });

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
