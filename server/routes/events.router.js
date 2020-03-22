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
      `INSERT INTO "events" ("event_name", "organizations_id", "contacts_id", "location", "date", "start_time", "end_time", "volunteers", "books_in", "books_out", "number_of_children", "number_of_adult_esl_learners", "notes")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);`
  
    pool.query(queryText,
      [req.body.event_name, req.body.organizations_id, req.body.contacts_id, req.body.location, req.body.date, req.body.start_time, req.body.end_time, req.body.volunteers, req.body.collectBooks, req.body.distBooks, req.body.numOfKids, req.body.numEslAdults, req.body.notes])
      .then(result => {
        console.log(result.rows)
        res.send(result.rows)
      }).catch(error => {
        console.log('error in event POST', error)
        res.sendStatus(500);
      })
  })

module.exports = router;