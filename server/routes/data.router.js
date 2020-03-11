const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

router.post('/', (req,res) => {
    console.log('req.body.xAxis:', req.body.xAxis)
    console.log('req.body.yAxis:', req.body.yAxis)
    let dataArr = []
    let labelsArr = []
    let label = req.body.yAxis
    let queryText = `SELECT * FROM "events";`;
    pool.query(queryText)
        .then((response) => {
            console.log(response.rows)
            if (req.body.yAxis === 'Books') {
                for (event of response.rows) {
                    dataArr.push(event.books_out)
                    labelsArr.push(event.event_name)
                }
            } else if (req.body.yAxis === 'Children') {
                for (event of response.rows) {
                    dataArr.push(event.number_of_children)
                    labelsArr.push(event.event_name)
                }
            }
            
            res.send({
                data: dataArr,
                labels: labelsArr,
                label: label
            })
        })
        .catch((error) => {
            console.log('error in query:', error)
        })
})

module.exports = router;