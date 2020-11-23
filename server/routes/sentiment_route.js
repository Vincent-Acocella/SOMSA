const express = require('express');
const router = express.Router();
const {getTopicList, getTopicByID} = require('../controllers/sentiment')

const Topics = require('../models/topic');

//Look up an account and see if it matches

//get topic list
router.get('/topiclist', getTopicList);
router.get('/getSentiment', getTopicByID)


module.exports = router;