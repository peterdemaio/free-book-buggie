const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/', (req, res) => {
  const queryText = 'SELECT * FROM "books_in";'
  console.log('in bookIn router.get', req.body)
  pool.query(queryText)
    .then(result => {
      console.log(result.rows)
      res.send(result.rows)
    }).catch(error => {
      console.log('error in bookIn GET', error)
      res.sendStatus(500);
    })
})

router.post('/', (req, res) => {
  console.log(req.body)
  const queryText =
      `INSERT INTO "books_in" ("event_id", "total_number_of_books", "baby", "beginner", "intermediate", "chapter", "non_fiction", "spring_holidays", "fall_holidays", "christmas")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`

  pool.query(queryText,
      [req.body.event_id, req.body.total_number_of_books, req.body.baby, req.body.beginner, req.body.intermediate, req.body.chapter, req.body.non_fiction, req.body.spring_holidays, req.body.fall_holidays, req.body.christmas])
      .then(result => {
          console.log(result.rows)
          res.send(result.rows)
      }).catch(error => {
          console.log('error in bookIn POST', error)
          res.sendStatus(500);
      })
})

module.exports = router;