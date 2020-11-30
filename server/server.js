const express = require('express');
const db = require('./conf.d/database');
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
require('dotenv').config();

//Test DB
db.authenticate()
  .then(() => console.log('Database Working'))
  .catch(err => console.log('Error: ' + err))

const app = express();

//Avoid SSL error
app.use(cors());

//Body parser
app.use(bodyParser.json());

//Cookie Parser
app.use(cookieParser());
 
//Account routes
app.use('/user', require('./routes/account_route' ));

//Sentiment route
app.use('/api', require('./routes/sentiment_route'));

const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';

var pipeline = require('./pipeline/pipeline');
//Run the pipeline once every day
//Will also be executed on every startup of the backends
window.setInterval(pipeline.onReceiveDataRequest(),  24 * 60 * 60 * 100)

// App
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, HOST);