const express=require('express');
const cors = require('cors');
const winston = require('winston');
const mongoose = require('mongoose');
const route=require('./memes');

const app=express(); 

winston.add(new winston.transports.File({filename:'logfile.log'}));
winston.add(new winston.transports.Console({colorize: true, prettyPrint: true}));

const uri = "mongodb://localhost/memesCollection";

mongoose.connect(uri, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(() => winston.info("Connected to mongodb server"))
    .catch(err => winston.error("error in connecting to mongodb", err));

const PORT=process.env.PORT||8081;

app.use(cors());
app.use(express.json());
app.use('/memes',route);

const swaggerUi = require('swagger-ui-express'), 
    swaggerDocument = require('./swagger.json');

process.on('uncaughtException',(ex)=>{
    winston.error("We got an uncaught exception",ex);
});

process.on('unhandledRejection',(ex)=>{
    winston.error("We got an unhandled rejection",ex);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.all("*",(req,res)=>{
    res.status(404).send({errors:["Invalid url"]});
});

app.listen(PORT,()=> winston.info(`running on port: ${PORT}`));