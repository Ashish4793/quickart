import express from "express";
const router = express.Router();
import passport from 'passport';
import passportLocalMongoose from 'passport-local-mongoose';
import User from '../models/user.js'
import { registerTrigger } from "../controllers/authController.js";

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.get('/login' , (req,res) => {
    if(req.isAuthenticated()){
        res.redirect('/');
    } else {
        res.render('login');
    }
});

router.get('/register' , (req,res) => {
    if(req.isAuthenticated()){
        res.redirect('/');
    } else{
        res.render('register');
    }
});


router.post('/register' , registerTrigger);

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/auth/login?auth=false'
}), function(req, res) {
    if(req.body.redirect_uri == ''){
        res.redirect('/');
    } else {
        const modifiedString = req.body.redirect_uri.replace('?redirect_uri=', '');
        res.redirect(modifiedString);
    }

});



export default router;