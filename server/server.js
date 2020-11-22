const express = require('express');
const db = require('./conf.d/database');
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const { exec } = require("child_process");
require('dotenv').config();

exec("scrapy runspider -o Test.json MST_Twitter.py", (error, stdout, stderr) => {
  if (error) {
      console.log(`error: ${error.message}`);
      return;
  }
  if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
  }
  console.log(`stdout: ${stdout}`);
});

//Test DB
//db.authenticate()
//  .then(() => console.log('Database Working'))
//  .catch(err => console.log('Error: ' + err))

const app = express();

//Avoid SSL error
//app.use(cors());

//Body parser
//app.use(bodyParser.json());

//Cookie Parser
//app.use(cookieParser());
 
//Account routes
app.use('/user', require('./routes/account_route' ));
//app.use('/api', require('./routes/sentiment_route'));


const api_port = process.env.PORT || 5000;

app.listen(api_port, console.log(`Server started on port ${api_port}`));

// app.get('/api/sentiments', (req, res) => {
//   const sentiments = [
//     {
//         "id": 1,
//         "name": "Government Collapse",
//         "catagory": "politics",
//         "publishedDate": "12/21/2020",
//         "reaction": 40
//     },
//     {
//         "id": 2,
//         "name": "Yankees Win World",
//         "catagory": "sports",
//         "publishedDate": "01/12/1998",
//         "reaction": 60
//     }
//   ];

//   res.json(sentiments);
// });