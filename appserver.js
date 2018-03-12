const restify = require('restify');
const appServer = restify.createServer();
const config = require('config');
const bodyParser = require('body-parser');
const corsMiddleware = require('restify-cors-middleware')
const userController = require('./controller/userController');

//Origin, allowHeaders, exposeHeaders values needs tobe changed
const cors = corsMiddleware({
  preflightMaxAge: 10, //Optional
  origins: ['*', '*'], //for dev env only *,* in production we have explicitly mention the origins
  allowHeaders: ['API-Token', 'Authorization'],
  exposeHeaders: ['API-Token-Expiry']
})


appServer.use(restify.plugins.acceptParser(appServer.acceptable));
appServer.use(restify.plugins.queryParser());
appServer.use(restify.plugins.bodyParser());
appServer.pre(cors.preflight);
appServer.use(cors.actual);

appServer.get("/", (req, res) => res.json({ message: "Welcome to our CGP!" }));


appServer.get('/user', userController.getUsers);
appServer.get('/user/:FirstName', userController.getUserByName);
appServer.post('/user', userController.postUser);
appServer.put('/user/:Email', userController.postUser);
appServer.del('/user/:Email', userController.deleteUser);

var Router = require('restify-router').Router;
var routerInstance = new Router();
routerInstance.applyRoutes(appServer);

module.exports = appServer;
