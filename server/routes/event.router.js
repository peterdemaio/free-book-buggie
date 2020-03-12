const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// router.get('/', (req, res) => {
//   const queryText = 'SELECT * FROM "books_in";'
//   console.log('in bookIn router.get', req.body)
//   pool.query(queryText)
//     .then(result => {
//       console.log(result.rows)
//       res.send(result.rows)
//     }).catch(error => {
//       console.log('error in bookIn GET', error)
//       res.sendStatus(500);
//     })
// })

router.post('/', (req, res) => {
  console.log(req.body)
  const queryText =
    `INSERT INTO "events" ("event_name", "location", "date", "start_time", "end_time", "volunteers", "books_collected", "books_distributed", "number_of_children", "number_of_adult_esl_learners", "notes")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`

  pool.query(queryText,
    [req.body.event_name, req.body.location, req.body.date, req.body.start_time, req.body.end_time, req.body.volunteers, req.body.books_collected, req.body.books_distributed, req.body.number_of_children, req.body.number_of_adult_esl_learners, req.body.notes])
    .then(result => {
      console.log(result.rows)
      res.send(result.rows)
    }).catch(error => {
      console.log('error in bookIn POST', error)
      res.sendStatus(500);
    })
})

module.exports = router;