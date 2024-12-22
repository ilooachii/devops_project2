const express = require('express');
const router = express.Router();

const Planet = require("../models/Planet.js");


router.get('/', function (req, res, next) {
    const planetsTable = Planet.list();
    res.render('planets/index.hbs', { planetsTable, errors: req.query.errors });
});

/* POST add planet. */
router.post('/add', function (req, res, next) {
    console.log("POST PROPOSE EXOPLANET");
    console.log("req.body.namePlanet : " + req.body.name);

    Planet.save({
    name: req.body.name,
    size: req.body.size,
    atmosphere: req.body.atmosphere,
    type: req.body.type
    });
    res.redirect('/planets');
    
});


module.exports = router;
