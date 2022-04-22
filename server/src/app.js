import express from 'express'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet';
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
import booksRoutes from './routes/books.routes'
import publishersRoutes from './routes/publishers.routes'
import bookImageRoutes from './routes/book.image.routes'
import passport from 'passport';
import cookieParser from 'cookie-parser'
import authorsRoutes from './routes/author.routes'

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
app.use('/', booksRoutes)
app.use('/', publishersRoutes)
app.use('/', authorsRoutes)

app.use('/files', express.static('files'));
app.use('/', bookImageRoutes);

app.use((err, req, res, next) => {
    if(err.name === 'UnauthorizedError'){
        res.status(401).json({error: `${err.name} : ${err.message}`})
    }
})

export default app;