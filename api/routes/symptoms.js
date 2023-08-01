const express = require('express');
const Symptom = require('../models/symptom');
const mongoose = require('mongoose');
const checkAuth = require('../middleware/chech-auth');
const router = express.Router();


mongoose.connect('mongodb+srv://ediyiechris:KZAgPoV6zxlBU5iU@cluster0.bzc9u0e.mongodb.net/?retryWrites=true&w=majority');



router.post('/', checkAuth, (req, res, next) => {
  const symptom = new Symptom({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    cause: req.body.cause,
    treatment: req.body.treatment,
    searchParameter: req.body.searchParameter,
  });
  symptom
    .save()
    .then(
      result => {
        console.log(result);
        res.status(201).json({
          message: "Symptoms added",
          addedSymptom: symptom
        });
      })
    .catch(error => console.log(error));




});


// router.get('/', checkAuth, (req, res, next) => {
//   Symptom.find({}).then(result => {
//     res.status(200).json(
//       result,
     
  
//     );
//   }).catch(
//     error => {
//       if (res.statusCode == 404) {
//         res.status(404).json({ message: "No Data Found" })
//       } else {
//         res.status(500).json(error);
//       }
//     }
//   );
// });

router.get('/', checkAuth, (req, res, next) => {
  const { name } = req.query;
  const symptomName = name.toLowerCase().split(',');
  Symptom.find({
    searchParameter: { $in: symptomName }
  }).then((symptom) => {
    if (symptom.length === 0) {
      res.status(404).json({
        message: 'No Symptoms found'
      });
    }
    else {
      res.status(200).json({ resultfound: symptom.length, foundSymptom: symptom });
    }
  }).catch(error => { console.log(error) });

});


module.exports = router;