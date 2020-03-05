const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/age', (req, res) => {
    const queryText = 'SELECT * FROM "demographics_age";'
    console.log('in demographics_age router.get', req.body)
    pool.query(queryText)
        .then(result => {
            console.log(result.rows)
            res.send(result.rows)
        }).catch(error => {
            console.log('error in demographics_age GET', error)
            res.sendStatus(500);
        })
})

router.get('/race', (req, res) => {
    const queryText = 'SELECT * FROM "demographics_race";'
    console.log('in demographics_race router.get', req.body)
    pool.query(queryText)
        .then(result => {
            console.log(result.rows)
            res.send(result.rows)
        }).catch(error => {
            console.log('error in demographics_race GET', error)
            res.sendStatus(500);
        })
})

router.get('/poverty', (req, res) => {
    const queryText = 'SELECT * FROM "demographics_poverty";'
    console.log('in demographics_poverty router.get', req.body)
    pool.query(queryText)
        .then(result => {
            console.log(result.rows)
            res.send(result.rows)
        }).catch(error => {
            console.log('error in demographics_poverty GET', error)
            res.sendStatus(500);
        })
})

module.exports = router;