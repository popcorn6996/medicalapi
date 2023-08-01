const express = require('express');
const Quote = require('../models/quote');
const checkAuth = require('../middleware/chech-auth');
const router = express.Router();

router.post('/', checkAuth, (req, res, next) => {
    const quote = new Quote({
        author: req.body.author,
        quote: req.body.quote,
    });

    quote
        .save()
        .then()
        .catch()


});

router.get('/:id', checkAuth, (req, res, next) => {
    const id = req.params.id
    Quote.find({ _id: id }).exec().then().catch()
});

module.exports = router;