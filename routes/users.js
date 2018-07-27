const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

//Login
router.post('/auth', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const query = { email: email}
    //Check the user exists
    User.findOne(query, (err, user ) => {
        if(err){
            return res.send({
                success: false, 
                message: 'Error, please try again'
            });
        }
        if(!user){
            return res.send({
                success: false, 
                message: 'Error, Account not found'
            });
        }
        
        user.isPasswordMatch(password, user.password, (err, isMatch) => {
            if(!isMatch){
                return res.send({
                    success: false, 
                    message: 'Error, Invalid password'
                });
            }
            
            const ONE_WEEK = 604800;
            const token = jwt.sign({user}, process.env.SECRET, {expiresIn: ONE_WEEK})
            let returnUser = {
                name: user.name,
                email: user.email,
                id: user._id,
                
            }

            return res.send({
                success: true,
                message: 'You can login now ',
                user: returnUser,
                token
            })
        })
    });
})


//registration
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    newUser.save((err, user) => {
        if(err) {
            return res.send({
                success: false, 
                message : 'Failed to save the user '
            });
        }
        res.send({
            success: true,
            message: 'User Saved',
            user
        });
    });
});


module.exports = router;