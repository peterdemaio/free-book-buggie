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
            queryText = `SELECT "event_name", SUM("${sumColumn}") FROM "events"
                         WHERE "date" > '${req.body.startDate}'
                         AND "date" < '${req.body.endDate}'
                         GROUP BY "event_name";`;
                         
            pool.query(queryText)
            .then((response) => {
                console.log(response.rows)
                for (event of response.rows) {
                    labelsArr.push(event.event_name)
                    dataArr.push(event.sum)
                    console.log('in for loop. dataArr:', dataArr)
                }
                res.send({
                    data: dataArr,
                    labels: labelsArr,
                    label: label
                })
            })
            .catch((error) => {
                console.log('data case Events error:', error)
            })
            console.log('after query, before break. dataArr:', dataArr)
            break;
        case 'Time':
            if (req.body.timeUnit === 'Month') {
                const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                queryText = `SELECT DATE_PART('month', "date") AS "month", SUM("${sumColumn}") FROM "events"
                            WHERE "date" > '${req.body.startDate}'
                            AND "date" < '${req.body.endDate}'
                            GROUP BY "month";`;
                pool.query(queryText)
                .then((response) => {
                    console.log(response.rows)
                    for (event of response.rows) {
                        labelsArr.push(months[event.month-1])
                        dataArr.push(event.sum)
                    }
                    res.send({
                        data: dataArr,
                        labels: labelsArr,
                        label: label
                    })
                })
                .catch((error) => {
                    console.log('data case Time error:', error)
                })
                
            } else if (req.body.timeUnit === 'Year') {
                queryText = `SELECT DATE_PART('year', "date") AS "year", SUM("${sumColumn}") FROM "events"
                            WHERE "date" > '${req.body.startDate}'
                            AND "date" < '${req.body.endDate}'
                            GROUP BY "year";`;
                pool.query(queryText)
                .then((response) => {
                    console.log(response.rows)
                    for (event of response.rows) {
                        labelsArr.push(event.year)
                        dataArr.push(event.sum)
                    }
                    res.send({
                        data: dataArr,
                        labels: labelsArr,
                        label: label
                    })
                })
                .catch((error) => {
                    console.log('data case Time error:', error)
                })
            }
            break;
        case 'Organizations':
            queryText = `SELECT "org_name", SUM("${sumColumn}") FROM "events"
                             JOIN "organizations" ON "events".organizations_id = "organizations".id
                             WHERE "date" > '${req.body.startDate}'
                             AND "date" < '${req.body.endDate}'
                             GROUP BY "org_name";`;
            pool.query(queryText)
            .then((response) => {
                console.log(response.rows)
                for (event of response.rows) {
                    labelsArr.push(event.org_name)
                    dataArr.push(event.sum)
                }
                res.send({
                    data: dataArr,
                    labels: labelsArr,
                    label: label
                })
            })
            .catch((error) => {
                console.log('data case Organization error:', error)
            })
            console.log('after query, before break')
            break;
        case 'Demographics':
            switch (req.body.metric) {
                case 'Age':
                    queryText = `SELECT * FROM "events"
                    JOIN "organizations" ON "events".organizations_id = "organizations".id
                    JOIN "demographics_age" ON "organizations".id = "demographics_age".organizations_id
                    WHERE "date" > '${req.body.startDate}'
                    AND "date" < '${req.body.endDate}';`;
                    pool.query(queryText)
                    .then((response) => {
                        console.log(response.rows)
                        labelsArr = ['0-3','4-7','8-12','13-18']
                        dataArr = [0,0,0,0]
                        for (ageGroup in labelsArr) {
                            console.log('age group:', labelsArr[ageGroup])
                            for (event of response.rows) {
                                console.log(event[labelsArr[ageGroup]], '% *', event[sumColumn])
                                console.log('=', Math.round(((event[labelsArr[ageGroup]])/100)*event[sumColumn]))
                                dataArr[ageGroup] += Math.round((event[labelsArr[ageGroup]]/100)*event[sumColumn])
                            }
                            console.log('sum:', dataArr[ageGroup])

                        }
                        console.log(dataArr)
                        res.send({
                            data: dataArr,
                            labels: labelsArr,
                            label: label
                        })
                    })
                    .catch((error) => {
                        console.log('data case Demographics error:', error)
                    })
                    console.log('after query, before break')
                    break
            }
            
            
    }
    console.log('dataArr:', dataArr)
    console.log('labelsArr:', labelsArr)
    console.log('label:', label)
    
      
})

module.exports = router;