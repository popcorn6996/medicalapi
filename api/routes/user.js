const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

router.post('/signup', (req, res, next) => {
    User.find({ email: req.body.email }).exec().then(
        user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'email exist'
                });
            }
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            name: req.body.name,
                            password: hash,
                        });
                        user
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'User Created',
                                    createdProduct: result
                                });
                            }).catch(
                                err => {
                                    console.log(err);
                                    res.status(500).json({
                                        error: err,
                                    });
                                }
                            );

                    }
                }
                )
            }
        }
    );



}
);

router.post('/login', (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                res.status(401).json({
                    message: 'Auth failed'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth Failed'
                    });
                }
                if (result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        id: user[0]._id
                    }, "secretkeyokay", { expiresIn: "3h" },)
                    return res.status(200).json({
                        message: 'Auth Successful',
                        token: token,
                    });
                }
                res.status(401).json({
                    message: 'Auth Failed'
                });
            });

        })

        .catch(err => { res.status(500).json({
            error: err
        })});
});


router.delete('/:userid', (req, res, next) => {
    const userId = req.params.userid;
    User.remove({ _id: userId })
        .exec()
        .then(
            result => { res.status(200).json({ message: 'User deleted' }) }
        )
        .catch(err => { res.status(500).json({ error: err }) });
});

module.exports = router;