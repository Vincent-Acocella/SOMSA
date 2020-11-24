const Sequalize = require('sequelize');
const db = require('../conf.d/database');
const {exec} = require("child_process");
const { on } = require('process');

callExec = function (argument) {

    //Call the Reddit Spider and parse the output
    //scrapy runspider -o data_out.json MST_Reddit.py
    process = exec(argument, {maxBuffer: 1024 * 1000}, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return 0;
        }
        if(stderr) {
            console.log(`stderr: ${stderr}`);
            return 0;
        }

    });

    process.on('exit', function() {
        console.log("Call " + argument + " complete");
    });
    return 1;
}

onRequest = async function() {
    var a = await callExec("scrapy runspider -o ../../machinelearning/data_out.json ../../webscraper/MST_Reddit.py");
    console.log(a);
    a = await callExec("scrapy runspider -o ../../machinelearning/data_out.json ../../webscraper/MST_Twitter.py");
    console.log(a);
    console.log("Test");
}

onRequest();

