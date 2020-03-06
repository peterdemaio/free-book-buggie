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

// add new event
router.post('/', (req, res) => {
    console.log(req.body)
    const queryText =
        `INSERT INTO "events" ("event_name", "organization_id", "date", "start_time", "end_time", "user_id", "books_in", "books_out", "number_of_children", "number_of_adult_esl_learners", "notes")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`

    pool.query(queryText,
        [req.body.event_name, req.body.organization_id, req.body.date, req.body.start_time, req.body.end_time, req.body.user_id, req.body.books_in, req.body.books_out, req.body.number_of_children, req.body.number_of_adult_esl_learners, req.body.notes])
        .then(result => {
            console.log(result.rows)
            res.send(result.rows)
        }).catch(error => {
            console.log('error in events POST', error)
            res.sendStatus(500);
        })
})

module.exports = router;