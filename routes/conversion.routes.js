const express = require('express')
const { conversions, getAllConversions } = require('../controllers/conversion.controller');

const routerConversion = express.Router();

// GET all conversions
routerConversion.route('/conversions')
.get(getAllConversions )

// POST a new conversion
routerConversion.route('/conversions')
.post(conversions)

// // GET a specific conversion by ID
// routerConversion.route('/conversions/:id')
// .get(conversions.id)

// // PUT (update) a specific conversion by ID
// routerConversion.route('/conversions/:id')
// .put(conversions.id)

// // DELETE a specific conversion by ID
// routerConversion.route('/conversions/:id')
// .delete(conversions.id)

module.exports = routerConversion;