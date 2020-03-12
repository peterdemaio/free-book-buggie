const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

router.post('/', (req,res) => {
    console.log('req.body.xAxis:', req.body.xAxis)
    console.log('req.body.yAxis:', req.body.yAxis)
    let dataArr = []
    let labelsArr = []
    let label = req.body.yAxis
    let queryText;
    let sumColumn;
    switch(req.body.yAxis) {
        case 'Books':
            sumColumn = 'books_out'
            break;
        case 'Children':
            sumColumn = 'number_of_children'
            break;
        case 'Adult ESL Learners':
            sumColumn = 'number_of_adult_esl_learners'
            break;
        default:
            console.log('yAxis error')
    }
    switch(req.body.xAxis) {
        case 'Events':
            queryText = `SELECT "event_name", SUM(${sumColumn}) FROM "events"
                             GROUP BY "event_name";`;
            pool.query(queryText)
            .then((response) => {
                console.log(response.rows)
                for (event of response.rows) {
                    labelsArr.push(event.event_name)
                    dataArr.push(event.sum)
                }
            })
            .catch((error) => {
                console.log('data case Events error:', error)
            })
            console.log('after query, before break')
            break;
        case 'Time':
            queryText = `SELECT "date", SUM(${sumColumn}) FROM "events"
                             GROUP BY "date";`;
            pool.query(queryText)
            .then((response) => {
                console.log(response.rows)
                for (event of response.rows) {
                    labelsArr.push(event.date)
                    dataArr.push(event.sum)
                }
            })
            .catch((error) => {
                console.log('data case Time error:', error)
            })
            console.log('after query, before break')
            break;;
        case 'Organizations':
            queryText = `SELECT "org_name", SUM(${sumColumn}) FROM "events"
                             JOIN "organizations" ON "events".organizations_id = "organizations".id
                             GROUP BY "org_name";`;
            pool.query(queryText)
            .then((response) => {
                console.log(response.rows)
                for (event of response.rows) {
                    labelsArr.push(event.org_name)
                    dataArr.push(event.sum)
                }
            })
            .catch((error) => {
                console.log('data case Organization error:', error)
            })
            console.log('after query, before break')
            break;
        case 'Demographics':
            queryText = `SELECT * FROM "events"
                     JOIN "organizations" ON "events".organizations_id = "organizations".id;`;
            pool.query(queryText)
            .then((response) => {
                console.log(response.rows)
                for (event of response.rows) {
                    // labelsArr.push(event.org_name)
                }
            })
            .catch((error) => {
                console.log('data case Demographics error:', error)
            })
            console.log('after query, before break')
            break;
    }
    console.log('dataArr:', dataArr)
    console.log('labelsArr:', labelsArr)
    console.log('label:', label)
    res.send({
        data: dataArr,
        labels: labelsArr,
        label: label
    })
      
})

module.exports = router;