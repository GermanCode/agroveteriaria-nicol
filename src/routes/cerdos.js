const express = require('express');
const router = express.Router();

pool = require('../database');

router.get('/add', (req, res)=>{
    res.send('Form');
})

module.exports = router;