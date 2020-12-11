const express = require('express');
const router = express.Router();
const {getTrendsByTopic, getSentimentFromSearch, getSentimentByID} = require('../controllers/sentiment')
//Look up an account and see if it matches

//get topic list
router.post('/getByCat', getTrendsByTopic);
router.get('/sentiment/:id', getSentimentByID)
router.post('/search', getSentimentFromSearch);

module.exports = router;