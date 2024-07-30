import User from "../models/user.js";
import passport from 'passport';
import Cart from "../models/cart.js";

export const registerTrigger = (req,res) => {
    if (req.isAuthenticated()){
        res.redirect("/")
    } else {
        User.register({
            username: req.body.username, name : req.body.name , email : req.body.username 
            }, req.body.password, function (err, user) {
            if (err) {
                if (err.name === 'UserExistsError') {
                    res.redirect('/auth/register?uax=true')
                } else {
                    res.status(500).render('server-error');
                    console.error('Error:', err);
                }
            } else {
                const newCart = new Cart({ user: user._id, items: [] });
                newCart.save();
                passport.authenticate("local")(req,res,function(){
                    res.redirect("/");
                });
            }
        });
    }
}