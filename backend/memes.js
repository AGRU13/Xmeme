const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

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

memeSchema.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: function (doc, ret) {   delete ret._id  }
  });

const MemeModel = mongoose.model('Memes', memeSchema);

router.post('/', async (req, res) => {
    try {
        //validation
        console.log(req.body);
        //check if body is same as mememodel
        const exists = await MemeModel.find(req.body);

        if(exists.length)
            return res.status(409).send({errors :['payload already exists']})

        const meme = await MemeModel.create(req.body);
        res.status(201).json({ id:meme.id });
    } catch (err) {
        res.sendStatus(500);
        console.error("error during post:", err);
    }
});

router.get('/',async(req,res)=>{
    try{
        
        let skip=0,count;
        if(req.query.skip) skip=parseInt(req.query.skip);
        count=await MemeModel.countDocuments();
        if(skip>=count) return res.status(200).send([]);

        const memes=await MemeModel.find()
                                    .sort({ _id : -1 })
                                    .skip(skip)
                                    .limit(100);

        res.status(200).send(memes);
    }catch(err){
        //empty
        res.sendStatus(500);
        console.error("error in getting 100 memes",err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        //validate the id 
        const meme = await MemeModel.findById(req.params.id);
        if(!meme)  return res.sendStatus(404);

        res.status(200).send(meme);
    } catch (err) {
        res.sendStatus(404);
        console.log("error during fetching by id", err);
    }
});

router.patch('/:id',async(req,res)=>{
    try{
        if(req.body.name) return res.sendStatus(400);

        const meme = await MemeModel.findById(req.params.id);
        if(!meme) return res.sendStatus(404);
        if(req.body.caption) meme.caption=req.body.caption;
        if(req.body.url) meme.url=req.body.url;

        await meme.save();
        res.sendStatus(204);
    }catch(err){
        res.sendStatus(400);
        console.error("during patch: ",err);
    }
});

router.delete('/:id',async(req,res) =>{
    try{
        //validate id
        const meme = await MemeModel.findByIdAndRemove(req.params.id);
        if(!meme) return res.sendStatus(404);
        res.status(200).send(meme);
    }catch(err){
        res.sendStatus(500);
        console.error("during delete: ",err);
    }
});

module.exports = router;