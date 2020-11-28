const Sequalize = require('sequelize');
const db = require('../conf.d/database');
const topic = require('../models/topic');
const {exec} = require("child_process");
const { on } = require('process');

var isAnalyzerReady = true;

callExec = async function (argument) {

    //Call the Reddit Spider and parse the output
    //scrapy runspider -o data_out.json MST_Reddit.py
    process = exec(argument, {maxBuffer: 1024 * 2000}, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return 0;
        }
        if(stderr) {
            console.log(`stderr: ${stderr}`);
            return 0;
        }

    });
    process.on('exit', await async function() {

    })
    /*process.on('exit', function() {
        console.log("Call " + argument + " complete");
        while(!isAnalyzerReady) {
            console.log();
        }
        //Either callExec, or send a POST to Flask depending on what we elect to do
        //With the latter option I'm not entirely sure how we'll know when our response is ready
        //With the former method, we invoke exec, set isAnalyzerReady to false
        //then use another process.on 'exit' to know when the SA is done and set isAnalyzerReady to true
        //That way, we're only calling the SA one at a  time
        //This *shouldn't* cause any issues with holding the entire backend since this while loops is asynchronous
        isAnalyzerReady = false;
        isAnalyzerReady = true;
        return 1
        
    });*/
    return 1;
}

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
            });
        })
    })

    //process_reddit = exec("scrapy runspider -o ../../machinelearning/data_out.json ../../webscraper/MST_Reddit.py");

   // process_reddit.on('exit', function () {

    //})
    //callExec("scrapy runspider -o ../../machinelearning/data_out.json ../../webscraper/MST_Twitter.py");
}

onRequest();

