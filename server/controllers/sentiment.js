const Topic = require('../models/topic');
const Account = require('../models/account')

exports.getTopicList = async (req,res) =>{

   let topicList = await Topic.findAll({
   });
   res.send(topicList);
}

exports.getTopicByID = async (req,res) => {

   let newUser = await Account.findOne({where: {Accound_ID: req.body.ID}});

   

}