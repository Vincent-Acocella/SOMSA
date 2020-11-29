const fs = require('fs');
const Sequalize = require('sequelize');
const db = require('../conf.d/database');
const topic = require('../models/topic');
const {exec} = require("child_process");
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require('jquery')(window);

readJson = function(filePath, callback) {
    fs.readFile(filepath, (err, fileData) => {
        if(err) {
            return callback && callback(err);
        }
        try {
            const dataObj = JSON.parse(fileData);
            return callback && callback(null, dataObj);
        }
        catch(err) {
            return callback && callback(err);
        }
    });
}

sendSentimentRequest = function(d) {
    $.ajax({
        data: d,
        url: 'http://localhost:8501/',
        beforeSend: function(xhr) {
            console.log("Sending request to the Sentiment Analyzer");
        },
        success: function(data) {
            //process the newly created json file by the Sentiment Analyzer
            alert(data);
            
            Object.keys(data).forEach(async function(key) {
                console.log(key);
                //If the data does not have a category, then that means it all ready exists in the table
                //Attach the category we orignally found to it
                if (data[key][1] === "NONE") {
                    category = topic.find({
                        where: {title: key},
                        attributes: ['Topic_Category']
                    })
                    data[key][1] = category
                }
                //Add the sentiment data to the sentiment table
                newSentiment = await sentiment.create({
                    Sentiment: data[key][2],
                    Confidence_Interval: data[key][3],
                    Table_Data: data[key]
                });

                 //Add the topic data to the topic table
                 newTopic = await topic.create({
                    Topic_Name: key,
                    Sentiment_ID: newSentiment.Sentiment_ID,
                    Topic_Category: data[key][1] 

                });
                
            });
        }
    });
}



onReceiveDataRequest = async function() {
    //topics = await topic.findAll({
    //    attributes: ['Topic_Name', 'Category']
    //});
    //For testing purposes we will use this simple table
    topics = ["Major League Baseball", "US Election", "Joe Biden", "Playstation 5", "EarthBound", "FreeMelee", "India", "Mother 3"]
    var spider_arg = "trend="
    for(var i = 0; i < topics.length; i++) {
        //We need to send the topics into the spider in a way that it can work with them, replace white space with underscores and concatenate by a period
        //topics[i] would become topics[i].Topic_Name
        var portion = topics[i];
        portion = portion.replace(new RegExp(" ", "g"), "_");
        spider_arg += portion + ".";
    }
    console.log(spider_arg);

    //Run the lookup scraper
    processDb = exec("scrapy runspider -o lookup_data_in.json -a " + spider_arg + " ../../webscraper/MST_Trend_Lookup.py", 
        {maxBuffer: 1024 * 2000}, (error, stdout, stderr) => {
    });

    //Run the Reddit scraper
    processReddit = exec("scrapy runspider -o reddit_data_in.json ../../webscraper/MST_Reddit.py",
        {maxBuffer: 1024 * 2000}, (error, stdout, stderr) => {
    });

    //Run the Twitter scraper
    processTwitter = exec("scrapy runspider -o twitter_data_in.json ../../webscraper/MST_Twitter.py",
        {maxBuffer: 1024 * 2000}, (error, stdout, stderr) => {

                 
    });
    processDb.on('exit', async function() {
        console.log("Lookup Scraper complete")
        readJson('./lookup_data_in', (err, data) => {
            if(err) {
                console.log(err);
                return;
            }
            console.log(data);
            sendSentimentRequest(data);
        });
    });

    processReddit.on('exit', async function() {
        console.log("Reddit Scraper complete")
        readJson('./lookup_data_in', (err, data) => {
            if(err) {
                console.log(err);
                return;
            }
            console.log(data);
            sendSentimentRequest(data);
        });
    });

    processTwitter.on('exit', async function() {
        console.log("Twitter Scraper complete")
        readJson('./lookup_data_in', (err, data) => {
            if(err) {
                console.log(err);
                return;
            }
            console.log(data);
            sendSentimentRequest(data);
        });
        
    });

    //process_reddit = exec("scrapy runspider -o ../../machinelearning/data_out.json ../../webscraper/MST_Reddit.py");

   // process_reddit.on('exit', function () {

    //})
    //callExec("scrapy runspider -o ../../machinelearning/data_out.json ../../webscraper/MST_Twitter.py");
}

onReceiveDataRequest();

