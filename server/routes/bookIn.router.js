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
    `INSERT INTO "books_in" ("events_id", "number_of_books")
    VALUES ($1, $2);`

  pool.query(queryText,
    [req.body.events_id, req.body.number_of_books])
    .then(result => {
      console.log(result.rows)
      res.send(result.rows)
    }).catch(error => {
      console.log('error in bookIn POST', error)
      res.sendStatus(500);
    })
})

module.exports = router;