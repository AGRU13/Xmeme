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
        maxlength: 255
    },
    url: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 255
    }
});

const MemeModel = mongoose.model('Memes', memeSchema);

router.post('/', async (req, res) => {
    try {
        //validation
        const meme = await MemeModel.create(req.body);
        res.status(201).json({ id: meme._id });
    } catch (err) {
        res.status(500);
        console.error("error during post:", err);
    }
});

router.get('/',async(req,res)=>{
    try{
        const memes=await MemeModel.find().limit(100).sort({ _id : 1 });
        res.status(200).json({
            memes
        });
    }catch(err){
        //empty
        console.error("error in getting 100 memes",err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const meme = await MemeModel.findById(req.params.id);
        res.status(200).json({
            meme
        });
    } catch (err) {
        res.status(404);
        console.log("error during fetching by id", err);
    }
});

module.exports = router;