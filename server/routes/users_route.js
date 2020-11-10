const express = require('express');
const router = express.Router();
const db = require('../conf.d/database');
const User = require('../models/user');

router.get('/', (req, res) => res.send(

    User.findAll()
    .then(user => {
        res.sendStatus(200);
        console.log(user);
    })
    .catch(err => console.log(err))
    ));
module.exports = router;