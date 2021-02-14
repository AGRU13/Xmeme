const express=require('express');
const cors = require('cors');
const winston = require('winston');
const mongoose = require('mongoose');
const route=require('./memes');
const app=express(); 

//winston is used for logging and here we have defined two paths for it
//first is the file called logfile
winston.add(new winston.transports.File({filename:'logfile.log'}));
// and other is the console just like console.log
winston.add(new winston.transports.Console({colorize: true, prettyPrint: true}));

//url to connect wiht mongoose database
const uri = "mongodb://localhost/memesCollection";

mongoose.connect(uri, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(() => winston.info("Connected to mongodb server"))
    .catch(err => winston.error("error in connecting to mongodb", err));

//port to listen for our server
const PORT=8081;

app.use(cors());
app.use(express.json());
//all the routes with memes will be served by route 
app.use('/memes',route);

const swaggerApp = express();
const swaggerPort=process.env.PORT||8080;
swaggerApp.use(cors());

const swaggerUi = require('swagger-ui-express'), 
    swaggerDocument = require('./swagger.json');

// listens for any uncaught exceptions
process.on('uncaughtException',(ex)=>{
    winston.error("We got an uncaught exception",ex);
});

//listens for any unhandled promis rejections
process.on('unhandledRejection',(ex)=>{
    winston.error("We got an unhandled rejection",ex);
});

//run the swagger docs on swagger-ui endpoint
app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//all the rest paths which are not hanled will be handled by this
app.all("*",(req,res)=>{
    res.status(404).send({errors:["Invalid url"]});
});

app.listen(PORT,()=> winston.info(`running on port: ${PORT}`));