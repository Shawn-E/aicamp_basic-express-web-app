// Basic Imports
const config = require("./config.json");
const express = require("express");
const multer = require('multer');
const bodyParser = require('body-parser');
const session  = require('express-session');

const app = express();

if (Number(process.version.slice(1).split(".")[0] < 16)) throw new Error(`Node.js v16 or higher is required, please update @ https://nodejs.org`);
var multerStorage = multer.memoryStorage()
app.use(multer({ storage: multerStorage }).any());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 31556952000 },
}));
app.use(express.static('public'));
app.use('/assets', express.static(__dirname + 'public/assets'))
app.set('views', './views');
app.set('view engine', 'ejs');


// Routing
app.get('/', async function(req, res) {
    res.render('index.ejs', { var1: "Hello World v1", query: req.query.message});
});


// Server Initialization
app.listen(config.port)
console.log('App Started - Port: ' + config.port);

// Rejection Handler
process.on('unhandledRejection', (err) => { 
    if(config.debugMode) console.log(chalk.red(err));
});