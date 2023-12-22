const express = require('express')
const conversion = require('../controllers/conversion.controller');

const router = express.router();

// GET all conversions
router.route('/conversions')
.get(conversions)

// POST a new conversion
router.route('/conversions')
.post(conversions)

// GET a specific conversion by ID
router.route('/conversions/:id')
.get(conversions.id)

// PUT (update) a specific conversion by ID
router.route('/conversions/:id')
.put(conversions.id)

// DELETE a specific conversion by ID
router.route('/conversions/:id')
.delete(conversions.id)

module.exports = router;