const mongoose = require('mongoose');
const express = require('express');
const winston = require('winston');
const Joi = require('joi');//for validation 
const router = express.Router();

//schema for the data in the database
const memeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    caption: {
        type: String,
        default: null,
        minlength: 3,
        maxlength: 255
    },
    url: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 2048
    }
});

// to delete _id and make a new propertie id with id=_id
memeSchema.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: function (doc, ret) {   delete ret._id  }
  });

const MemeModel = mongoose.model('Memes', memeSchema);

router.post('/', async (req, res) => {
    try {
        //schema for validation of incoming request body
        const schema = Joi.object({
            name: Joi.string().min(3).max(255).required(),
            caption: Joi.string().min(3).max(255).required(),
            url: Joi.string().uri().min(10).max(2048).required()
        });
        const {error} = schema.validate(req.body);
        if(error)
            return res.status(400).send({errors: [error.details[0].message]})
        
        //checking if the data already exist
        const exists = await MemeModel.find(req.body);

        //if already exisits 
        if(exists.length)
            return res.status(409).send({errors :['payload already exists']});

        const meme = await MemeModel.create(req.body);
        res.status(201).json({ id:meme.id });
    } catch (err) {
        res.sendStatus(500);
        winston.error("error during post request",err);
    }
});

router.get('/',async(req,res)=>{
    try{
        //skip for pagination
        let skip=0,count;
        if(req.query.skip) skip=parseInt(req.query.skip);
        count=await MemeModel.countDocuments();

        //if documents to skip are more than there are present in the database
        if(skip>=count) return res.status(200).send([]);

        const memes=await MemeModel.find()
                                    .sort({ _id : -1 })
                                    .skip(skip)
                                    .limit(100);

        res.status(200).send(memes);
    }catch(err){
        res.sendStatus(500);
        winston.error("error during get request for 100 memes",err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        //checking if the id paramater is a valid mongodb id
        if(!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(400).send({errors:['id format is not valid']});

        const meme = await MemeModel.findById(req.params.id);
        if(!meme)  return res.sendStatus(404);

        res.status(200).send(meme);
    } catch (err) {
        res.sendStatus(500);
        winston.error("error during get request for a particular meme",err);
    }
});

router.patch('/:id',async(req,res)=>{
    try{
        //checking if the id paramater is a valid mongodb id
        if(!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(400).send({errors:['id format is not valid']});

        //validation schema for request object
        const schema = Joi.object({
            caption: Joi.string().min(3).max(255),
            url: Joi.string().uri().min(10).max(2048)
        });
        const {error} = schema.validate(req.body);
        if(error)
            return res.status(400).send({errors: [error.details[0].message]})
        
        const meme = await MemeModel.findById(req.params.id);

        if(!meme) return res.sendStatus(404);

        //chenging the document properties value if they are present
        if(req.body.caption) meme.caption=req.body.caption;
        if(req.body.url) meme.url=req.body.url;

        await meme.save();
        res.sendStatus(204);
    }catch(err){
        res.sendStatus(500); 
        winston.error("error during patch request",err);
    }
});

router.delete('/:id',async(req,res) =>{
    try{
        if(!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(400).send({errors:['id format is not valid']});

        const meme = await MemeModel.findByIdAndRemove(req.params.id);
        if(!meme) return res.sendStatus(404);
        res.status(200).send(meme);
    }catch(err){
        res.sendStatus(500); 
        winston.error("error during delete request",err);
    }
});

module.exports = router;