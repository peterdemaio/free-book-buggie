const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const router = express.Router();

router.get('/', (req, res) => {
    const queryText = `SELECT "contacts".id, "contacts".contact_name, "contacts".phone_number, "contacts".phone_number_type, "contacts".email, "contacts".notes, "organizations".org_name FROM "contacts"
    JOIN "organizations" ON "organizations".id = "contacts".organizations_id;`
    console.log('in contacts router.get', req.body)
    pool.query(queryText)
        .then(result => {
            console.log(result.rows)
            res.send(result.rows)
        }).catch(error => {
            console.log('error in contacts GET', error)
            res.sendStatus(500);
        })
})

router.put('/', rejectUnauthenticated, (req, res) => {
    console.log('ready to edit organization with', req.body)
    let id = req.body.id
    let contact_name = req.body.contact_name
    let phone_number = req.body.phone_number
    let phone_number_type = req.body.phone_number_type
    let email = req.body.email
    let notes = req.body.notes

    let sqlText1 = `UPDATE "contacts" 
                SET "contact_name" = $1, 
                    "phone_number" = $2, 
                    "phone_number_type" = $3, 
                    "email" = $4, 
                    "notes" = $5 
                    WHERE "id" = $6;`;
    let sqlText2 = 'SELECT * FROM "contacts" ORDER BY "id";'
    pool.query(sqlText1, [contact_name, phone_number, phone_number_type, email, notes, id])
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