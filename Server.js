import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { database } from './Database/mongodb.js'
import Auth from './Routes/Auth.js'
import Movie from './Routes/Movieroute.js'
import Bannerhome from './Routes/Bannerhome.js'
import Netflixmovie from './Routes/Netflixmovieroute.js'
dotenv.config()
const app = express()
const port = process.env.PORT || 3000
// middleware
app.use(bodyParser.json())

app.use(express.json())
app.use(cors({
    origin: ['https://ketfliix.netlify.app/'],
    // origin: ['http://localhost:5173'],
    methods: ['POST', 'GET', 'PUT', "DELETE"],
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true
}))
app.use(cookieParser())

database()

app.use('/auth',Auth)
app.use('/movie',Movie)
app.use('/addban',Bannerhome)
app.use('/addnet',Netflixmovie)
app.listen(port, () => {
    console.log(`Server is listen on port ${port}`)
})