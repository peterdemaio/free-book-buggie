const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const router = express.Router();

router.get('/', (req, res) => {
    const queryText = `SELECT "organizations".id, "organizations".org_name, "organizations".logo, "organizations".url, "organizations".type, "organizations".address_number", "organizations".address_street, "organizations".address_unit, "organizations".city, "organizations".city, "organizations".state, "organizations".zip, "organizations".zip, "organizations".notes, "counties".name FROM "organizations"
                        JOIN "counties" ON "counties.id" = "organizations".county                 
                        ORDER BY "id";`
    console.log('in organizations router.get', req.body)
    pool.query(queryText)
        .then(result => {
            console.log(result.rows)
            res.send(result.rows)
        }).catch(error => {
            console.log('error in organizations GET', error)
            res.sendStatus(500);
        })
})

router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('in organizations post router', req.body)
    const newEntry = req.body;
    console.log(newEntry)
    const queryText = `INSERT INTO "organizations" ("org_name", "logo", "type", 
                            "address_number", "address_street", "address_unit", "city",
                            "state", "county", "zip", "notes") 
                            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`;
    let queryText2 = 'SELECT * FROM "organizations" ORDER BY "id";'
    const queryValues = [
        newEntry.name,
        newEntry.logo,
        newEntry.type,
        newEntry.address_number,
        newEntry.address_street,
        newEntry.address_unit,
        newEntry.city,
        newEntry.state,
        newEntry.county,
        newEntry.zip,
        newEntry.notes
    ];
    pool.query(queryText, queryValues)
        .then(
            pool.query(queryText2)
                .then(result => {
                    console.log(result.rows)
                    res.send(result.rows)
                })
                .catch((err) => {
                    console.log('Error updating organization', err);
                    res.sendStatus(500);
                })
                .catch((err) => {
                    console.log('Error updating organization', err);
                    res.sendStatus(500);
                })
        )
        
});

router.put('/', rejectUnauthenticated, (req, res) => {
    console.log('ready to edit organization with', req.body)
    let id = req.body.id
    let url = req.body.url
    let logo = req.body.logo
    let address_number = req.body.address_number
    let address_street = req.body.address_street
    let address_unit = req.body.address_unit
    let city = req.body.city
    let state = req.body.state
    let zip = req.body.zip
    let county = req.body.county
    let notes = req.body.notes

    let sqlText1 = `UPDATE "organizations" 
                SET "logo" = $1,
                    "url" = $2,
                    "address_number" = $3, 
                    "address_street" = $4, 
                    "address_unit" = $5,
                    "city" = $6, 
                    "state" = $7, 
                    "zip" = $8, 
                    "county" = $9, 
                    "notes" = $10 
                    WHERE "id" = $11
                    RETURNING "organizations";`;
    let sqlText2 = 'SELECT * FROM "organizations" ORDER BY "id";'
    pool.query(sqlText1, [logo, url, address_number, address_street, address_unit, city, state, zip, county, notes, id])
        .then(
            pool.query(sqlText2)
                .then(result => {
                    console.log(result.rows)
                    res.send(result.rows)
                })
                .catch((err) => {
                    console.log('Error updating organization', err);
                    res.sendStatus(500);
                })
                .catch((err) => {
                    console.log('Error updating organization', err);
                    res.sendStatus(500);
                }) 
        )
        
        
})
module.exports = router;