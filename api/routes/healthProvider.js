const express = require('express');
const mongoose = require('mongoose');
const HealthProvider = require('../models/healthprovider');
const router = express.Router();


router.post('/', (req, res, next) => {
    const healthProvider = new HealthProvider(
        {
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            location: req.body.location,
            searchParameter: req.body.searchParameter,
        }
    );
    healthProvider
        .save()
        .then(
            result => {
                res.status(201).json({
                    message: 'Operation Successful',
                    operation: result,
                });
            }
        )
        .catch(
            err => {
                res.status(500).json({
                    error: err
                });
            }
        )

});

router.get('/', (req, res, next) => {
    const { location } = req.query;
    // const mlocation = location.toLowerCase();
    HealthProvider.find({
        searchParameter: { $regex: new RegExp(location, "i") }
    }
    ).exec()
        .then(
            result => {
                if(result.length <= 0){
                    res.status(404).json({
                        message: `No Health Care found in ${result}`
                    });
                } else{
                    res.status(200).json({
                        fetchedResults: result.length,
                        message: 'Got Health Care',
                        fetchedHospitals: result
                    });
                }
            
            }

        )
        .catch(
            err => {
                res.status(500).json({
                    error: err,
                });
            }
        )

});
module.exports = router;

