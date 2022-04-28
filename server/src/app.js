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

{
  config.FBClientID && config.FBClientSecret  ?
  passport.use(
    new FacebookStrategy(
      {
        clientID: config.FBClientID,
        clientSecret: config.FBClientSecret,
        callbackURL: '/auth/facebook/callback',
        profileFields: ["email", "name"],
      },

     async function(accessToken, refreshToken, profile, done) {

      const initArray = []

      for(let i=0; i<100;i++){
        initArray.push(i)
      }

      const passwordArr = []

      for(let i=0; i<8;i++){
        passwordArr.push(initArray[Math.floor(Math.random()*100)])
      }

      const assignedPassword = passwordArr.join('')
     
        const userData = {
        facebookId:profile.id,
          email: profile._json.email,
          username: profile._json.first_name+" "+profile._json.last_name,
          password:'FB@'+assignedPassword ,
          loggedWithFacebook:true,
          assignedPassword: 'FB@'+assignedPassword,
          changePasswordInfo: 'no'
        };

        const user = await User.findOne({'facebookId':userData.facebookId})
        if(!user){
          await new User(userData).save();
        }else{
          await User.findOneAndUpdate({'facebookId':userData.facebookId}, {loggedWithFacebook:true})
        }

        return done(null, profile);
     }
        
    )
  ) : app.use("/auth/facebook/callback",(req,res) => {
    res.redirect('http://localhost:3000/error')
  })
}
  



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