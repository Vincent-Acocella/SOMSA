const express = require('express');
const router = express.Router();
const db = require('../conf.d/database');
const User = require('../models/user');

router.get('/', (req, res) => res.send(

    User.findAll()
    .then(user => {
        console.log(user);
        res.sendStatus(200);
    })
    .catch(err => console.log(err))
    ));

module.exports = router;