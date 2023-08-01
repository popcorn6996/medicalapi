const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const decoded  = jwt.verify(token, "secretkeyokay");
        next();
        req.userData = decoded;
    } catch(error){
        return res.status(401).json({
            message: 'Auth Failed'
        });
    }
};