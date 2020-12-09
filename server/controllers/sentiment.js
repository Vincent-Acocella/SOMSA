const Topic = require('../models/topic');
const Sentiment = require('../models/sentiment');

exports.getTrendsByTopic = async (req,res) =>{
   console.log(req.body.cat)

   //catagory is selected
   //get all topics and ids that go with 
   //sends
   let allInfo = await Topic.findAll({
      attributes: ['Sentiment_ID', 'Topic_Name'],
      where: {Category: req.body.cat}
   });
   if(allInfo.length < 1){
      return res.status(401).json({success: false, error: 'Sorry we have no data in the catagory'});
   }

   res.json({success:true, info: allInfo});
}

exports.getSentimentByID = async (req,res) =>{
   let id = req.params.id;

   let sentimentToGet = await Sentiment.findOne({
      where:{Sentiment_ID:id}
   });

   if(sentimentToGet ==null){
      return res.status(401).json({success: false, error: 'We could not find the sentiment'});
   }

   res.json({success:true, CI: sentimentToGet.Confidence_Interval, sentiment: sentimentToGet.Sentiment});
}

exports.getSentimentFromSearch = async (req,res) => {

   let id = await Topic.findOne({
      attributes: ['Sentiment_ID'],
      where: {Topic_Name: req.body.name}});

      if(topic == null){
         return res.status(401).json({success: false, error: 'Sorry we have no data on that topic'});
      }

      let foundSent = await Sentiment.findOne({
         attributes: ['Confidence_Interval'],
         where:{Sentiment_ID: id}
      })

      if(foundSent === null){
         return res.status(401).json({success: false, error: 'An Error Occured on our end'});
      }

      res.json({success:true, trend: req.body.Topic_Name, CI: foundSent});
}