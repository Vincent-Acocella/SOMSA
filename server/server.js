const express = require('express');
const db = require('./conf.d/database');
const cors = require('cors')
const bodyParser = require('body-parser')

//Test DB
db.authenticate()
  .then(() => console.log('Database Working'))
  .catch(err => console.log('Error: ' + err))

const app = express();

//Cors allows helps with the blocking of SSL by browsers
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.use(cors());

//Body parser

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

//Account routes
app.use('/user', require('./routes/users_route' ));
//app.use('/api', require('./routes/api_routes'));

const api_port = process.env.PORT || 5000;

app.listen(api_port, console.log(`Server started on port ${api_port}`));

app.get('/api/sentiments', (req, res) => {
  const sentiments = [
    {
        "id": 1,
        "name": "Government Collapse",
        "catagory": "politics",
        "publishedDate": "12/21/2020",
        "reaction": 40
    },
    {
        "id": 2,
        "name": "Yankees Win World",
        "catagory": "sports",
        "publishedDate": "01/12/1998",
        "reaction": 60
    }
  ];

  res.json(sentiments);
});