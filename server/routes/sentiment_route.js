const express = require('express');
const router = express.Router();
const {getTopicList, getTopicByID} = require('../controllers/sentiment')
const sentiment = require('../models/sentiment');
const Topics = require('../models/topic');

//Look up an account and see if it matches

//get topic list
router.post('/the', async (req,res) =>{
    console.log(req.body)
    try{

        newSentiment = await sentiment.create({
            Sentiment: req.body.s,
            Confidence_Interval: req.body.ci,
            Table_Data: req.body.td
        });

        return res.status(200).json({success: true, sent: 'Added'});
    }catch(err){
        return res.status(401).json({success: false, error: err});
    }
});
router.post('/next', async (req,res) =>{
    console.log(req.body)
    try{
        newTopic = await topic.create({
           Sentiment_ID: req.s,
           Topic_Name: req.n,
           Topic_Category: req.c 
        })

        return res.status(200).json({success: true, sent: 'Added'});
    }catch(err){
        return res.status(401).json({success: false, error: err});
    }
});

module.exports = router;