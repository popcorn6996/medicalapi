const express = require('express');
const mongoose = require('mongoose');
const checkAuth = require('../middleware/chech-auth');
const Nutrition = require('../models/nutrition');
const router = express.Router();


router.post('/', checkAuth, (req, res, next) => {
    const nutrition = new Nutrition({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        details: req.body.details,
    });
    nutrition
        .save()
        .then((result => {
            console.log(result);
            res.status(201).json({
                message: 'Nutrition added',
                addedNutrition: result,
            });
        }))
        .catch((error) => {
            console.log(error);
            res.json(500).json({
                message: error,
            });
        });

});

router.get('/', checkAuth, (req, res, next) => {
    const name = req.query;
    Nutrition.find({ name:  { $regex: new RegExp(name, "i") } })
        .exec()
        .then(
            (result => {
                console.log(result);
                res.status(200).json({
                    message: 'nutrition fetched',
                    fetchednutrition: result
                });
            })
        ).catch((err) => {
            console.log(err);
            res.status(500).json({
                message: err
            })
        });
});

module.exports = router;