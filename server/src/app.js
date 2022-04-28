import express from 'express'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet';
import userRoutes from './routes/user.routes'
import passport from 'passport';
import filesRoutes from './routes/files.routes'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.routes'
import strategy from "passport-facebook";
import User from "./models/user.model";
import config from './config/config'

const FacebookStrategy = strategy.Strategy;

const router = express.Router()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(compress())
app.use(cors())
app.use(helmet())
app.use(cookieParser())
app.use(passport.initialize())

  passport.use(
    new FacebookStrategy(
      {
        clientID: config.FBClientID,
        clientSecret: config.FBClientSecret,
        callbackURL: config.FBcallbackURL,
        profileFields: ["email", "name"],
      },

     async function(accessToken, refreshToken, profile, done) {

        const userData = {
        facebookId:profile.id,
          email: profile._json.email,
          username: profile._json.first_name+" "+profile._json.last_name,
          password:profile.id,
          loggedWithFacebook:true
        };

        const user =  await User.findOne({'facebookId':userData.facebookId})
        if(!user){
          await new User(userData).save();
        }else{
            await User.findOneAndUpdate({'facebookId':userData.facebookId}, {loggedWithFacebook:true})
        }

        return done(null, profile);
     }
        
    )
  );



app.use('/', authRoutes)
app.use('/', userRoutes)
app.use('/', filesRoutes)
app.use('/files', express.static('files'));

app.use((err, req, res, next) => {
    if(err.name === 'UnauthorizedError'){
        res.status(401).json({error: `${err.name} : ${err.message}`})
    }
})



export default app;