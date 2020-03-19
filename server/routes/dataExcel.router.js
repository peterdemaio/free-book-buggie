const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

router.post('/', (req,res) => {

    let sumColumn;
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    switch(req.body.yAxis) {
        case 'Books Distributed':
            sumColumn = 'books_out'
            break;
        case 'Children':
            sumColumn = 'number_of_children'
            break;
        case 'Books Collected':
            sumColumn = 'books_in'
            break;
        default:
            console.log('yAxis error')
    }

    switch(req.body.xAxis) {
        case 'Events':
            console.log('in Excel router')
            queryText = `SELECT "event_name", "date", "start_time", "end_time", "org_name", "contact_name", "books_in" AS "books_collected", "books_out" AS "books_distributed", "number_of_children", "location", "volunteers", "events".notes 
                        FROM "events"
                        JOIN "organizations" ON "events".organizations_id = "organizations".id
                        JOIN "contacts" ON "events".contacts_id = "contacts".id
                        WHERE "date" > '${req.body.startDate}'
                        AND "date" < '${req.body.endDate}';`;  
            pool.query(queryText)
            .then((response) => {
                res.send(response.rows)
            })
            .catch((error) => {
                console.log('dataExcel case Events error:', error)
            })
            break;
        case 'Time':
            if (req.body.timeUnit === 'Month') {
                queryText = `SELECT CONCAT(DATE_PART('month', "date"), ' ', DATE_PART('year', "date")) AS "month_year", SUM("books_in") AS "books_collected", SUM("books_out") AS "books_distributed", SUM("number_of_children") AS "number_of_children" FROM "events"
                            WHERE "date" > '${req.body.startDate}'
                            AND "date" < '${req.body.endDate}'
                            GROUP BY "month_year";`;
                pool.query(queryText)
                .then((response) => {
                    res.send(response.rows)
                })
                .catch((error) => {
                    console.log('data case Time error:', error)
                })
            } else if (req.body.timeUnit === 'Year') {
                queryText = `SELECT DATE_PART('year', "date") AS "year", SUM("books_in") AS "books_collected", SUM("books_out") AS "books_distributed", SUM("number_of_children") AS "number_of_children" FROM  "events"
                            WHERE "date" > '${req.body.startDate}'
                            AND "date" < '${req.body.endDate}'
                            GROUP BY "year";`;
                pool.query(queryText)
                .then((response) => { 
                    res.send(response.rows)
                })
                .catch((error) => {
                    console.log('data case Time error:', error)
                })
            }
            break;
        case 'Organizations':
            queryText = `SELECT "org_name", SUM("books_in") AS "books_collected", SUM("books_out") AS "books_distributed", SUM("number_of_children") AS "number_of_children" FROM "events"
                             JOIN "organizations" ON "events".organizations_id = "organizations".id
                             WHERE "date" > '${req.body.startDate}'
                             AND "date" < '${req.body.endDate}'
                             GROUP BY "org_name";`;
            pool.query(queryText)
            .then((response) => {
                console.log(response.rows)
                res.send(response.rows)
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
                        console.log('Demographics/age query response.rows:', response.rows)
                        //this array will not be modified, but its values will be used to parse each event object
                        labelsArr = ['0-3','4-7','8-12','13-18']
                        //this array has corresponding indices to the array above and will represent 
                        //the number of books or children in each age group
                        dataArr = [0,0,0,0]

                        for (ageGroupIndex in labelsArr) {
                            console.log('ageGroup ' + labelsArr[ageGroupIndex] + ':')
                            for (event of response.rows) {
                                console.log(event[labelsArr[ageGroupIndex]] + '% * ' + event[sumColumn])
                                console.log('=', Math.round((event[labelsArr[ageGroupIndex]]/100)*event[sumColumn]))
                                
                                //Option 1:
                                //dataArr[ageGroupIndex] += Math.round((event[labelsArr[ageGroupIndex]]/100)*event[sumColumn])
                                //
                                //Option 2:
                                //ageGroup is string in labelsArr
                                let ageGroup = labelsArr[ageGroupIndex]
                                //accessing age group columns ('0-3','4-7', etc.), but JS doesn't allow hyphens in 
                                //variable names/object keys, so using event['0-3'] instead of event.0-3
                                let ageGroupPercentage = event[ageGroup]
                                //changing from 50 to 0.5, etc.
                                ageGroupPercentage = ageGroupPercentage/100
                                //same as event.sumColumn
                                let booksOrChildren = event[sumColumn]
                                //multiply books or children by the percentage
                                let approximateBooksOrChildren = booksOrChildren * ageGroupPercentage
                                //round approximate quantity to nearest whole number
                                let roundedApproximateBooksOrChildren = Math.round(approximateBooksOrChildren)
                                //add this quanitity to the previous events' quantities in the same age group
                                dataArr[ageGroupIndex] += roundedApproximateBooksOrChildren

                                //now move on to the next event
                            }
                            //now move on to the next age group and start with the first event again
                            console.log('sum:', dataArr[ageGroupIndex])
                            console.log('')
                        }
                        let dataExcelArr = [];
                        for (row in labelsArr) {
                            let obj = {demographic: labelsArr[row]}
                            obj[sumColumn] = dataArr[row]
                            dataExcelArr.push(obj)
                        }
                        console.log(dataExcelArr)
                        res.send(dataExcelArr)
                    })
                    .catch((error) => {
                        console.log('data case Demographics error:', error)
                    })
                    console.log('after query, before break')
                    break
                case 'Poverty':
                    queryText = `SELECT CONCAT(DATE_PART('month', "date"), ' ', DATE_PART('year', "date")) AS "monthYear", SUM("${sumColumn}") as "sum", AVG("demographics_poverty"."percentage_NSLP") as "NSLP"  FROM "events"
                    JOIN "organizations" ON "events".organizations_id = "organizations".id
                    JOIN "demographics_poverty" ON "demographics_poverty".organizations_id = "organizations".id
                    WHERE "date" > '${req.body.startDate}'
                    AND "date" < '${req.body.endDate}'
                    AND "${sumColumn}" > 0
                    GROUP BY "monthYear";`;
                    pool.query(queryText)
                    .then((response) => {
                        labelsArr = [];
                        dataArr = [];
                        console.log('Demographics/poverty query response.rows', response.rows)
                        for (event of response.rows) {
                            let numOfPoorKids = Math.round((event.sum * (event.NSLP / 100)))
                            let monthInt = event.monthYear.split(' ')[0]
                            let year = event.monthYear.split(' ')[1]
                            labelsArr.push('NSLP Kids in ' + months[monthInt-1] + ' ' + year)
                            dataArr.push(numOfPoorKids)
                            console.log(dataArr)
                        }
                        let dataExcelArr = [];
                            for (row in labelsArr) {
                                let obj = {demographic: labelsArr[row]}
                                obj[sumColumn] = dataArr[row]
                                dataExcelArr.push(obj)
                            }
                        console.log('Poverty dataExcelArr:', dataExcelArr)
                        res.send(dataExcelArr)
                        })
                    break;
                case 'Race':
                    queryText = `SELECT * FROM "events"
                    JOIN "organizations" ON "events".organizations_id = "organizations".id
                    JOIN "demographics_race" ON "organizations".id =
                    "demographics_race".organizations_id
                    WHERE "date" > '${req.body.startDate}'
                    AND "date" < '${req.body.endDate}'
                    AND "${sumColumn}" > 0;`;
                    pool.query(queryText)
                        .then((response) => {
                            console.log('Demographics/race query response.rows', response.rows)

                            //this array will not be modified, but its values will be used to parse each event object

                            labelsArr = ['white', 'black_or_african_american', 'american_indian_or_alaska_native', 'asian', 'native_hawaiian_or_pacific_islander']
                            labelsArr2 = ['White', 'Black or African American', 'American Indian or Alaska Native', 'Asian', 'Native Hawaiian or Pacific Islander']

                            //this array has corresponding indices to the array above and will represent 
                            //the number of books or children in each racial group
                            dataArr = [0, 0, 0, 0, 0]

                            for (raceGroupIndex in labelsArr) {
                                console.log('raceGroupIndex' + labelsArr[raceGroupIndex] + ':')
                                for (event of response.rows) {
                                    console.log(event[labelsArr[raceGroupIndex]] + '% * ' + event[sumColumn])
                                    console.log('=', Math.round((event[labelsArr[raceGroupIndex]] / 100) * event[sumColumn]))

                                    // option: raceGroup is string in labelsArr
                                    let raceGroup = labelsArr[raceGroupIndex];
                                    //accessing age group columns but JS doesn't allow hyphens in 
                                    //variable names/object keys, so using event[] instead of event.0-3
                                    let raceGroupPercentage = event[raceGroup]
                                    //changing from 50 to 0.5, etc.
                                    raceGroupPercentage = raceGroupPercentage / 100;
                                    //same as event.sumColumn
                                    let raceOfChildren = event[sumColumn];
                                    //multiply race of children by the percentage
                                    let approximateRaceOfChildren = raceOfChildren * raceGroupPercentage
                                    //round approximate quantity to nearest whole number
                                    let roundedApproximateRaceOfChildren = Math.round(approximateRaceOfChildren)
                                    //add this quanitity to the previous events' quantities in the same age group
                                    dataArr[raceGroupIndex] += roundedApproximateRaceOfChildren
                                }
                                //now move on to the next age group and start with the first event again
                                console.log('sum:', dataArr[raceGroupIndex])
                            }
                            let dataExcelArr = [];
                            for (row in labelsArr2) {
                                let obj = {demographic: labelsArr2[row]}
                                obj[sumColumn] = dataArr[row]
                                dataExcelArr.push(obj)
                            }
                        console.log('Race dataExcelArr:', dataExcelArr)
                        res.send(dataExcelArr)
                        })
                    break;
                default:
                    console.log('demographic metric error')   
            }       
    }

})

module.exports = router;