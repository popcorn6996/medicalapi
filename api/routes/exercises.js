const express = require('express');
const mongoose = require('mongoose');
const querystring = require('querystring');
const checkAuth = require('../middleware/chech-auth');
const router = express.Router();
const Exercise = require('../models/exercise');

router.post('/', checkAuth, (req, res, next) => {
    const exercise = new Exercise({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        type: req.body.type,
        details: req.body.details,
    });
    exercise
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'exercise',
                addedSymptom: result,
            });
        })
        .catch(
            err => {
                console.log(err);
                res.status(500).json({
                    error: err,
                });
            });
});


router.get('/', checkAuth, (req, res, next) => {
   // const queryParams  = querystring.parse(req.url.split('?')[1]);
    const { name } = req.query;
    // const mname = name.split(" ");
    console.log(name);
    Exercise.find({
        name:  { $regex: new RegExp(name, "i") }
    }).exec()
        .then(result => {
            if (result.length <= 0) {
                res.status(404).json({
                    message: 'No exercise found'
                });
            } else {
                res.status(200).json({
                    fetchedResults: result.length,
                    message: 'Operation successful',
                    fetchedExercise: result
                });

            }

        })
        .catch(err => {
            res.status(500).json({
                error: err,
            });
        });


});


module.exports = router;