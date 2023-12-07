const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
const DB = require('./database.js');
const { MongoDBCollectionNamespace } = require('mongodb');

const authCookieName = 'token';
const apiKey = process.env.APIKEY;

// The service port may be set on the command line
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json({limit: '50mb'}));

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set('trust proxy', true);

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
  console.log("got to create endpoint");
  if (await DB.getUser(req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.name, req.body.email, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// GetUser returns information about a user
apiRouter.get('/user/:email', async (req, res) => {
  const user = await DB.getUser(req.params.email);
  if (user) {
    const token = req?.cookies.token;
    res.send({ email: user.email, authenticated: token === user.token });
    return;
  }
  res.status(404).send({ msg: 'Unknown' });
});

// secureApiRouter verifies credentials for endpoints
var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

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

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
