import express from 'express'
import { movieModel } from '../Models/Movies.js'
import { netflixModel } from '../Models/Netflixmovies.js'


const app = express
const route = app.Router()
// Adding new movie
route.post('/addnetmovie', async (req, res) => {
    try {
        const { title, description, posterimage, moviesrc, genre } = req.body
        if (!title || !description || !moviesrc) {
            return res.status(401).json({
                message: 'please fill all fields',
                success: true
            })
        }
        const saveurl = await netflixModel.create({ title, description, posterimage, moviesrc, genre })
        res.status(201).json({ // Use 201 for successful creation
            message: 'Movie added successfully',
            success: true,
            movie: saveurl,
        });
    } catch (error) {

    }
})

// Getting all movies
route.get('/getnetmovie', async (req, res) => {
    try {
        const getallmovie = await netflixModel.find()
        return res.status(201).json(getallmovie)
    } catch (error) {
        console.log(error)
    }
})
// Getting  movies by id
route.get('/getnetmovie/:id', async (req, res) => {
    try {
        const { id } = req.params
        const getmoviebyid = await netflixModel.findById(id)
        return res.status(201).json(getmoviebyid)
    } catch (error) {
        console.log(error)
    }
})

// Editing movie
route.put('/editnetmovie/:id', async (req, res) => {
    const id = req.params.id
    const { title, description, posterimage, moviesrc, genre } = req.body
    try {
        const findmovie = await netflixModel.findByIdAndUpdate(id, { title, description, posterimage, moviesrc, genre }, { new: true })
        return res.status(200).json({ message: 'Movie updated Succesfully', success: true, findmovie })

    } catch (error) {
        console.log(error)
    }
})

// Deleting movie by id
route.delete('/deletenetmovie/:id', async (req, res) => {
    try {
        const { id } = req.params

        await netflixModel.findByIdAndDelete(id)

        return res.status(200).json({ message: 'Movie Deleted Succesfully', success: true })
    } catch (error) {
        console.log(error)
    }
})

export default route
