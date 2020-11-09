const express = require('express');
const router = express.Router();
const db = require('../conf.d/database');
const User = require('../models/users');

router.get('/', (req,res) => res.send('USERS'));
module.exports = router;