import User from "../models/user.js";
// IMPORTANT NOTE!!!: User Model is dependency for all authenticated routes

export const quickartElitePage = async (req , res) => {
    try {
        if (req.isAuthenticated()) {
            // BUSINESS LOGIC YET TO BE IMPLEMENTED
            res.render('quickartElitePage');
        } else {
            res.redirect('/auth/login');
        }
    } catch (error) {
        res.render('server-error');
        console.log(error);
    }
}

export const quickartEliteBilling = async (req,res) => {
    res.render('page-construction');
}