import express from 'express'
import { movieModel } from '../Models/Movies.js'


const app = express
const route = app.Router()
// Adding new movie
route.post('/addmovie', async (req, res) => {
    try {
        const { mainmovieurl, aboutmovieurl, movieimageurl } = req.body
        if (!mainmovieurl || !aboutmovieurl) {
            return res.status(401).json({
                message: 'please fill all fields',
                success: true
            })
        }
        const saveurl = await movieModel.create({ mainmovieurl, aboutmovieurl, movieimageurl })
        res.status(201).json({ // Use 201 for successful creation
            message: 'Movie added successfully',
            success: true,
            movie: saveurl,
        });
    } catch (error) {

    }
})

// Getting all movies
route.get('/getmovie', async (req, res) => {
    try {
        const getallmovie = await movieModel.find()
        return res.status(201).json(getallmovie)
    } catch (error) {
        console.log(error)
    }
})
// Getting  movies by id
route.get('/getmovie/:id', async (req, res) => {
    try {
        const {id} = req.params
        const getmoviebyid = await movieModel.findById(id)
        return res.status(201).json(getmoviebyid)
    } catch (error) {
        console.log(error)
    }
})

// Editing movie
route.put('/editmovie/:id', async (req, res) => {
    const id = req.params.id
    const { aboutmovieurl, mainmovieurl,movieimageurl } = req.body
    try {
        const findmovie = await movieModel.findByIdAndUpdate(id, { aboutmovieurl, mainmovieurl,movieimageurl }, { new: true })
        return res.status(200).json({ message: 'Movie updated Succesfully', success: true, findmovie })

    } catch (error) {
        console.log(error)
    }
})

// Deleting movie by id
route.delete('/deletemovie/:id', async (req, res) => {
    try {
        const { id } = req.params

         await movieModel.findByIdAndDelete(id)

        return res.status(200).json({ message: 'Movie Deleted Succesfully', success: true })
    } catch (error) {
        console.log(error)
    }
})

export default route
