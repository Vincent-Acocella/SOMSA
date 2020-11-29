const Sequalize = require('sequelize');
const db = require('../conf.d/database');
const topic = require('../models/topic');
const {exec} = require("child_process");
const { on } = require('process');

onRequest = async function() {
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

    process_db = exec("scrapy runspider -o ../../machinelearning/lookup_data_in.json -a " + spider_arg + " ../../webscraper/MST_Trend_Lookup.py", 
        {maxBuffer: 1024 * 2000}, (error, stdout, stderr) => {
    });

    process_db.on('exit', async function() {
        //Run the reddit scraper
        process_reddit = exec("scrapy runspider -o ../../machinelearning/reddit_data_in.json ../../webscraper/MST_Reddit.py",
        {maxBuffer: 1024 * 2000}, (error, stdout, stderr) => {
        });
        process_reddit.on('exit', async function() {
            //Run the twitter scraper
            process_reddit = exec("scrapy runspider -o ../../machinelearning/twitter_data_in.json ../../webscraper/MST_Twitter.py",
            {maxBuffer: 1024 * 2000}, (error, stdout, stderr) => {
                //All of our spiders are complete and have collected their data
                //Call a POST to the TensorFlow Serving container
                $.ajax({
                    url: 'http://localhost:8501/',
                    beforeSend: function(xhr) {
                        console.log("Sending request to the Sentiment Analyzer");
                    },
                    success: function(data) {
                        //process the newly created json file by the Sentiment Analyzer
                        alert(data);
                        
                        Object.keys(data).forEach(function(key) {
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
                            //Add the topic data to the topic table
                            newTopic = await topic.create({
                                Topic_Name: key,
                                Topic_Category: data[key][1] 

                            });
                            //Add the sentiment data to the sentiment table
                            newSentiment = await sentiment.create({
                                Sentiment: data[key][2],
                                Confidence_Interval: data[key][3],
                                Table_Data: data[key]
                            });
                            
                            //Link the two tables together
                            topic_sentiment.create({
                                Topic_ID: newTopic.Topic_ID,
                                Sentiment_ID: newSentiment.SentimentID
                            });
                        });
                    }
                });     
            });
        });
    })

    //process_reddit = exec("scrapy runspider -o ../../machinelearning/data_out.json ../../webscraper/MST_Reddit.py");

   // process_reddit.on('exit', function () {

    //})
    //callExec("scrapy runspider -o ../../machinelearning/data_out.json ../../webscraper/MST_Twitter.py");
}

onRequest();

