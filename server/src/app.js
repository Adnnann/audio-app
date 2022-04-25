import express from 'express'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet';
import userRoutes from './routes/user.routes'
import passport from 'passport';
import filesRoutes from './routes/files.routes'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.routes'
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(compress())
app.use(cors())
app.use(helmet())
app.use(passport.initialize())
app.use(cookieParser())


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