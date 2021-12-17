const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * Get all of the items on the shelf
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  const sqlText = `
    SELECT * FROM "item"
    WHERE "user_id"=$1;
  `;
  const sqlValues = [req.user.id];
  pool.query(sqlText, sqlValues)
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((dbErr) => {
      res.sendStatus(500);
    })
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  // endpoint functionality
  console.log(req.body);
  console.log('user', req.user);
  const sqlText = `
  INSERT INTO "item"
    ("description", "image_url", "user_id")
    VALUES
    ($1, $2, $3);
  `;
  const sqlValues = [
    req.body.description,
    req.body.image,
    req.user.id
  ];
pool.query(sqlText, sqlValues)
  .then((dbRes) => {
    res.sendStatus(201);
  })
  .catch((dbErr) => {
    res.sendStatus(500);
  })
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', (req, res) => {
  const itemToDelete = req.params.id;
  console.log('req.params.id:', req.params.id);
  const queryText = `
  DELETE FROM "item"
  WHERE "id"=$1;`;
  const queryValues = [itemToDelete];
  pool.query(queryText, queryValues)
    .then((dbRes) => {
      res.sendStatus(200);
    }).catch((dbErr) => {
      res.sendStatus(500);
      console.log('items delete dbErr:', dbErr);
    });
});
  // endpoint functionality

/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {
  // endpoint functionality
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get('/count', (req, res) => {
  // endpoint functionality
});

/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {
  // endpoint functionality
});

module.exports = router;
