import express from 'express'
import { userModel } from '../Models/User.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
const app = express

const route = app.Router()
const secretkey = process.env.SecretKey || 'sdbmshfhfhbksbcaesikfolhfl'
route.post('/register', async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        return res.status(400).json({
            message: 'Fill All Fields',
            success: false
        })
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            message: 'Invalid email format',
            success: false,
        });
    }
    const existuser = await userModel.findOne({ email })
    if (existuser) {
        return res.status(409).json({
            message: 'User Already Exist',
            success: false
        })
    }
    const hashpassword = await bcryptjs.hash(password, 10)
    const newuser = new userModel({ name, email, password: hashpassword })
    await newuser.save()
    return res.status(201).json({
        message: 'User Created Successfully ',
        success: true
    })
})


route.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                message: 'Fill All Fields',
                success: false
            })
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(409).json({
                message: 'User not found',
                success: false
            })
        }
        const ispasswordcorrect = await bcryptjs.compare(password, user.password)
        if (!ispasswordcorrect) {
            return res.status(400).json({
                message: 'Invalid Credentials',
                success: false
            })
        }
        const token = jwt.sign({ id: user._id }, secretkey, { expiresIn: '1d' })
        res.cookie('token', token, {
            sameSite: 'none',
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            secure: true
        })
        if (email === 'hell@gmail.com' && ispasswordcorrect) {
            return res.status(200).json({
                token: token,
                message: `Logged in Successfully Mr Owner ${user.name}`,
                success: true,
                owner: true
            })
        } else {
            return res.status(200).json({
                token: token,
                message: `Logged in Successfully ${user.name}`,
                success: true,
                owner: false
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'User failed to login',
            success: false
        })
    }
})

route.post('/logout', async (req, res) => {
    try {
        return res.cookie('token', '', {
            httpOnly: true,
            expiresIn: new Date(0)
        }).json({
            message: 'user loggedout successfully',
            success: true
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'User failed to logout',
            success: false
        })
    }
})


route.get('/getuser/:id', async (req, res) => {
    try {
        const id = req.params.id

        const finduser = await userModel.findById(id).select('-password')
        if (!finduser) {
            return res.status(401).json({
                message: "User not found",
                success: false
            })
        }
        return res.status(201).json
            ({
                message: 'User found',
                user: finduser
            })
    } catch (error) {
        console.log(error)
    }
})
route.get('/verifytoken', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1] || req.cookie.token; // Extract token
    if (!token) {
        return res.status(401).json({ valid: false });
    }

    jwt.verify(token, secretkey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ valid: false });
        }
        res.json({ valid: true, user: decoded }); // Return user data
    });
});
export default route