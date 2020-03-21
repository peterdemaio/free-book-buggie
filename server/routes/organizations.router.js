const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const router = express.Router();

router.get('/', (req, res) => {
    const queryText = `SELECT "organizations".id, "organizations".org_name, "organizations".logo, 
                        "organizations".url, "organizations".type, "organizations".address_number, 
                        "organizations".address_street, "organizations".address_unit, "organizations".city, 
                        "organizations".state, "organizations".zip, "organizations".notes, 
                        "counties".county_id, "counties".county_name, "demographics_age"."0_3" AS "age_0_3", 
                        "demographics_age"."4_7" AS "age_4_7", "demographics_age"."8_12" AS "age_8_12", "demographics_age"."13_18" AS "age_13_18", 
                        "demographics_race".white, "demographics_race".black_or_african_american, 
                        "demographics_race".american_indian_or_alaska_native, "demographics_race".asian, 
                        "demographics_race".native_hawaiian_or_pacific_islander, "demographics_poverty"."percentage_NSLP"
                        FROM "organizations"
                        JOIN "counties" ON "counties".county_id = "organizations".county_id  
                        JOIN "demographics_age" ON "demographics_age".organizations_id = "organizations".id
                        JOIN "demographics_race" ON "demographics_race".organizations_id = "organizations".id
                        JOIN "demographics_poverty" on "demographics_poverty".organizations_id = "organizations".id
                        ORDER BY "organizations".org_name;`

    console.log('in organizations router.get', req.body)
    pool.query(queryText)
        .then(result => {
            res.send(result.rows)
        }).catch(error => {
            console.log('error in organizations GET', error)
            res.sendStatus(500);
        })
})

//Route setup for edit to multiple tables from 'add new organization form'

router.post('/', rejectUnauthenticated, async (req, res) => {
    const newEntry = req.body;

    console.log(newEntry);

    const connection = await pool.connect()
    try {
        await connection.query('BEGIN');
        const sqlAddOrganization = `INSERT INTO "organizations" 
                                    ("org_name", "logo", "url", "type", "address_number", "address_street", 
                                    "address_unit", "city", "state", "county_id", "zip", "notes") 
                                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) 
                                    RETURNING id`;
        const organizationQueryValues = [
            newEntry.name,
            newEntry.logo,
            newEntry.url,
            newEntry.type,
            newEntry.address_number,
            newEntry.address_street,
            newEntry.address_unit,
            newEntry.city,
            newEntry.state,
            newEntry.county_id,
            newEntry.zip,
            newEntry.notes
        ];
        // Save the result so we can get the returned value
        const result = await connection.query(sqlAddOrganization, organizationQueryValues);
        // Get the id from the result - will have 1 row with the id 
        const organizationsId = result.rows[0].id;

        const sqlAddContact = `INSERT INTO "contacts" 
                                ("contact_name", "title", "organizations_id", "phone_number",
                                "phone_number_type", "email", "notes")
                                VALUES ($1, $2, $3, $4, $5, $6, $7)`;
        const contactQueryValues = [
            newEntry.contact_name,
            newEntry.title,
            organizationsId,
            newEntry.phone_number,
            newEntry.phone_number_type,
            newEntry.email,
            newEntry.notes
        ]
        await connection.query(sqlAddContact, contactQueryValues);

        const sqlAddAgeDemographics = `INSERT INTO "demographics_age"
                                    ("organizations_id", "0_3", "4_7", "8_12", "13_18")
                                    VALUES ($1, $2, $3, $4, $5)`;
        const demQueryValues = [
            organizationsId,
            newEntry.demographics_age_0_3,
            newEntry.demographics_age_4_7,
            newEntry.demographics_age_8_12,
            newEntry.demographics_age_13_18
        ]
        await connection.query(sqlAddAgeDemographics, demQueryValues);

        const sqlAddRaceDemographics = `INSERT INTO "demographics_race"
                                    ("organizations_id", "white", "black_or_african_american", 
                                    "american_indian_or_alaska_native", "asian", 
                                    "native_hawaiian_or_pacific_islander")
                                    VALUES ($1, $2, $3, $4, $5, $6)`;
        const demRaceQueryValues = [
            organizationsId,
            newEntry.demographics_race_white,
            newEntry.demographics_race_black,
            newEntry.demographics_race_native,
            newEntry.demographics_race_asian,
            newEntry.demographics_race_pacific
        ]
        await connection.query(sqlAddRaceDemographics, demRaceQueryValues);

        const sqlAddPovertyDemographics = `INSERT INTO "demographics_poverty"
                                            ("organizations_id", "percentage_NSLP")
                                            VALUES ($1, $2)`;
        const povertyQueryValues = [
            organizationsId,
            newEntry.demographics_poverty
        ]
        await connection.query(sqlAddPovertyDemographics, povertyQueryValues)

        await connection.query('COMMIT');
        res.sendStatus(200);
    } catch (error) {
        await connection.query('ROLLBACK');
        console.log(`Transaction Error - Rolling back new account`, error);
        res.sendStatus(500);
    } finally {
        connection.release()
    }

});


router.put('/', rejectUnauthenticated, async (req, res) => {
    const newEntry = req.body;

    const connection = await pool.connect()

    try {
        await connection.query('BEGIN');
        console.log('ready to edit organization with', req.body)

        const organizationQueryValues = [
            newEntry.address.logo,
            newEntry.address.url,
            newEntry.address.address_number,
            newEntry.address.address_street,
            newEntry.address.address_unit,
            newEntry.address.city,
            newEntry.address.state,
            newEntry.address.zip,
            newEntry.address.county_id,
            newEntry.address.notes,
            newEntry.address.id,
        ]

        let editOrganizationQuery = `UPDATE "organizations" 
                SET "logo" = $1,
                    "url" = $2,
                    "address_number" = $3, 
                    "address_street" = $4, 
                    "address_unit" = $5,
                    "city" = $6, 
                    "state" = $7, 
                    "zip" = $8, 
                    "county_id" = $9, 
                    "notes" = $10 
                    WHERE "id" = $11
                    RETURNING "id";`;

        const result = await connection.query(editOrganizationQuery, organizationQueryValues);
        // Get the id from the result - will have 1 row with the id 
        const organizationsId = result.rows[0].id;

        const sqlAgeDems = `UPDATE "demographics_age"
                SET "0_3" = $1,
                    "4_7" = $2,
                    "8_12" = $3,
                    "13_18" = $4
                WHERE "organizations_id" = $5;`

        const demographicsAgeQueryValues = [
            newEntry.demographics.age_0_3,
            newEntry.demographics.age_4_7,
            newEntry.demographics.age_8_12,
            newEntry.demographics.age_13_18,
            organizationsId
        ]

        await connection.query(sqlAgeDems, demographicsAgeQueryValues);

        const sqlRaceDems = `UPDATE "demographics_race"
                SET "white" = $1,
                    "black_or_african_american" = $2,
                    "american_indian_or_alaska_native" = $3,
                    "asian" = $4,
                    "native_hawaiian_or_pacific_islander" = $5
                WHERE "organizations_id" = $6;`

        const demographicsRaceQueryValues = [
            newEntry.demographics.white,
            newEntry.demographics.black_or_african_american,
            newEntry.demographics.american_indian_or_alaska_native,
            newEntry.demographics.asian,
            newEntry.demographics.native_hawaiian_or_pacific_islander,
            organizationsId

        ]

        await connection.query(sqlRaceDems, demographicsRaceQueryValues);

        const sqlPovertyDems = `UPDATE "demographics_poverty"
                SET "percentage_NSLP" = $1
                WHERE "organizations_id" = $2
            `
        const demographicsPovertyQueryValues = [
            newEntry.demographics.percentage_NSLP,
            organizationsId
        ]

        await connection.query(sqlPovertyDems, demographicsPovertyQueryValues)

        await connection.query('COMMIT');
        res.sendStatus(200);
    } catch (error) {
        await connection.query('ROLLBACK');
        console.log(`Transaction Error - Rolling back new account`, error);
        res.sendStatus(500);
    } finally {
        connection.release()
    }

});
module.exports = router;