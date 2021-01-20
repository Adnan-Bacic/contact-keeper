const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

//route: POST, api/users
//desc: register a user
//access: public
router.post('/',
[
    //set checks
    check('name', 'name is required')
        .not()
        .isEmpty(),
    check('email', 'please include a valid email')
        .isEmail(),
    check('password', 'passwords must be 6 or more characters')
        .isLength({ min: 6 })
],
async (req, res) => {
    const errors = validationResult(req);
    //if there are erros
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    //res.send('passed');

    //destructure
    const { name, email, password } = req.body;

    try{
        let user = await User.findOne({ email: email });

        if(user){
            return res.status(400).json({ msg: 'user already exists' });
        }

        //create the new user
        user = new User({
            name: name,
            email: email,
            password: password
        });

        //salt the password
        const salt = await bcrypt.genSalt(10);

        //hash the password from the user object
        user.password = await bcrypt.hash(password, salt);

        //save user
        await user.save();

        //res.send('user saved');

        //object to send in the token
        const payload = {
            user:{
                id: user.id
            }
        }

        //set token
        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err, token) => {
            if(err) throw err;
            res.json({ token });
        }
        );
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('server error');
    }
}
);

module.exports = router;