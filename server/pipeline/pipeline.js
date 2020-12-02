const fs = require('fs');
const Sequalize = require('sequelize');
const db = require('../conf.d/database');
const topic = require('../models/topic_sentiment_association');
const sentiment = require('../models/sentiment');
const {exec} = require("child_process");
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require('jquery')(window);

const TOPIC_CATEGORIES = [
    "Trending",
    "Politics",
    "Sports",
    "Science",
    "Technology"
]

readJson = function(filePath, callback) {
    fs.readFile(filePath, 'utf-8', (err, fileData) => {
        if(err) {
            return callback && callback(err);
        }
        try {
            var dataObj = JSON.parse(fileData);
            return callback && callback(null, dataObj);
        }
        catch(err) {
            return callback && callback(err);
        }
    });
}

sendSentimentRequest = function(d) {
    console.log("sendSentimentRequest");
    console.log(d);
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8000/predict',
        data: JSON.stringify(d),
        contentType: 'application/json',
        //dataType: 'json',
        error: function() {
            console.log("Request could not be processed.");
        },
        success: function(data) {
            //process the newly created json file by the Sentiment Analyzer
            //console.log(data);
            
            Object.keys(data).forEach(async function(key) {
               // console.log(key);
                //If the data does not have a category, then that means it all ready exists in the table
                //Attach the category we orignally found to it
                if (data[key][1] === "NONE") {
                    category = topic.Topic.find({
                        where: {title: key},
                        attributes: ['Topic_Category']
                    })
                    data[key][1] = category;
                }

                //If the topic is not one of our predetermined ones, then default it to Trending
                if(!(TOPIC_CATEGORIES.includes(data[key][1]))) {
                    data[key][1] = "Trending";
                }
                //Add the sentiment data to the sentiment table
                var s = false;
                if (data[key][2] === "Positive") {
                    s = true;
                }
                newSentiment = await sentiment.create({
                    Sentiment: s,
                    Confidence_Interval: data[key][3],
                    Table_Data: data[key]
                });

                 //Add the topic data to the topic table
                 console.log(newSentiment.Sentiment_ID)
                 newTopic = await topic.Topic.create({
                    Sentiment_ID: newSentiment.Sentiment_ID,
                    Topic_Name: key,
                    Category: data[key][1] 

                });
                
                
            });
        }
    });
}


exports.onReceiveTimeout = async function() {
    topics = await topic.Topic.findAll({
        attributes: ['Topic_Name', 'Category']
    });
    //For testing purposes we will use this simple table
    
    //topics = ["US Election"]
    var spider_arg = "trend="
    var doTrendLookup = false; 
    var uniqueTopics = []
    for(var i = 0; i < topics.length; i++) {
        //We need to send the topics into the spider in a way that it can work with them, replace white space with underscores and concatenate by a period
        //topics[i] would become topics[i].Topic_Name
        doTrendLookup = true;
        if (!(uniqueTopics.includes(topics[i].Topic_Name))) {
            var portion = topics[i].Topic_Name;
            portion = portion.replace(new RegExp(" ", "g"), "_");
            spider_arg += portion + ".";
            uniqueTopics.push(topics[i].Topic_Name);
        }       
    }
    console.log(spider_arg);

    //Run the lookup scraper
    processDb = null;
    if (doTrendLookup) {
        processDb = exec("scrapy runspider -o ../python-test/webscraper/lookup_data_in.json -a " + spider_arg + " ../python-test/webscraper/MST_Trend_Lookup.py", 
            {maxBuffer: 1024 * 2400}, (error, stdout, stderr) => {
                if(error) {
                    console.log(stderr);
                }
        });
    }

    //Run the Reddit scraper                                                                ../python-test/webscraper/MST_Trend_Lookup.py"
    processReddit = exec("scrapy runspider -o ../python-test/webscraper/reddit_data_in.json ../python-test/webscraper/MST_Reddit.py",
        {maxBuffer: 1024 * 2000}, (error, stdout, stderr) => {
            if(error) {
                console.log(stderr);
            }
    });

    //Run the Twitter scraper
    processTwitter = exec("scrapy runspider -o ../python-test/webscraper/twitter_data_in.json ../python-test/webscraper/MST_Twitter.py",
        {maxBuffer: 1024 * 2000}, (error, stdout, stderr) => {
            if(error) {
                console.log(stderr);
            }    
    });
    try {
        processDb.on('exit', async function() {
            console.log("Lookup Scraper complete")
            readJson('../python-test/webscraper/lookup_data_in.json', (err, data) => {
                if(err) {
                    console.log(err);
                    return;
                }
                fs.rm('../python-test/webscraper/lookup_data_in.json', (err) => {
                    if(err) {
                        console.log(err);
                    }
                });
                
               // data = JSON.stringify(data);
                console.log(data);
                sendSentimentRequest(data);
                //return 0;
                
            });
        });
    }
    catch(err) {
        console.log("Database is empty. No topics to parse.")
    }
    

    processReddit.on('exit', async function() {
        console.log("Reddit Scraper complete")
        readJson('../python-test/webscraper/reddit_data_in.json', (err, data) => {
            if(err) {
                console.log(err);
                return;
            }
            fs.rm('../python-test/webscraper/reddit_data_in.json', (err) => {
                if(err) {
                    console.log(err);
                }
            });
            
            //data = JSON.stringify(data);
            console.log(data);
            //Object.keys(data).forEach(function(key) {
            //   sendSentimentRequest(data[key]);
            //});
           sendSentimentRequest(data);
        });
    });

    processTwitter.on('exit', async function() {
        console.log("Twitter Scraper complete")
        readJson('../python-test/webscraper/twitter_data_in.json', (err, data) => {
            if(err) {
                console.log(err);
                return;
            }
            fs.rm('../python-test/webscraper/twitter_data_in.json', (err) => {
                if(err) {
                    console.log(err);
                }
            });
        
           //data = JSON.stringify(data)
           //console.log(data);
           //Object.keys(data).forEach(function(key) {
           //    sendSentimentRequest(data[key]);
           //});
           sendSentimentRequest(data);
        });
        
    });

    //process_reddit = exec("scrapy runspider -o ../../machinelearning/data_out.json ../../webscraper/MST_Reddit.py");

   // process_reddit.on('exit', function () {

    //})
    //callExec("scrapy runspider -o ../../machinelearning/data_out.json ../../webscraper/MST_Twitter.py");
}

