import express from "express";
import authCtrl from '../controllers/auth.controller'
import passport from 'passport';
const router = express.Router()

router.route('/auth/signin')
.post(authCtrl.signin)

router.route('/auth/signinFacebookUser')
.get(authCtrl.signinFacebookUser)

router.route('/auth/updateFacebookUserStatus')
.put(authCtrl.changeStatusOfFacebookUser)

router.route('/auth/signout')
.post(authCtrl.signout)

router.get("/auth/facebook", 
passport.authenticate("facebook",
{authType: 'reauthenticate', 
scope: ['email', 'manage_pages']}))

router.get("/auth/facebook/callback",
passport.authenticate("facebook", {
    successRedirect: "http://localhost:3000/musicLibrary",
    failureRedirect: "http://localhost:3000/musicLibrary",
    session : false 
    })
);
   
router.get('/protected', passport.authenticate('jwt', { session: false }),
    (req, res) => {
        if(req.cookies.userJwtToken){
            res.send(
               JSON.stringify({message: req.cookies.userJwtToken})
            )
        }
    }
)


export default router;