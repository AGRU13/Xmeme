const express=require('express');
const mongoose = require('mongoose');
const route=require('./memes');
const app=express(); 

app.use(express.json());
app.use('/memes',route);

mongoose.connect("mongodb://localhost/memesCollection", {
    useNewUrlParser: true})
    .then(() => console.log("Connected to mongodb server"))
    .catch(err => console.error("error in connecting to mongodb", err));


const PORT=8081;

app.all("*",(req,res)=>{
    res.status(404);
    res.send("path doesn't exist");
});

app.listen(PORT,()=> console.log(`running on port: ${PORT}`));