const jwt = require('jsonwebtoken');
const config = require('config');

//middleware function
module.exports = function(req, res, next){
    //get token from header
    const token = req.header('x-auth-token');

    //check if not token
    if(!token){
        return res.status(401).json({ msg: 'no token, authorization denied '});
    }

    try{
        //verify token
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        //set user from payload tro req.user
        req.user = decoded.user;
        next();
    }
    catch(err){
        res.status(401).json({ msg: 'token is not valid' });
    }
}