const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/', (req, res) => {
    const queryText = 'SELECT * FROM "events";'
    console.log('in events router.get', req.body)
    pool.query(queryText)
        .then(result => {
            console.log(result.rows)
            res.send(result.rows)
        }).catch(error => {
            console.log('error in events GET', error)
            res.sendStatus(500);
        })
})

module.exports = router;