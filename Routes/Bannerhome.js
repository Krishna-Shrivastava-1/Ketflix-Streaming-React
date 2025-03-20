import express from 'express'
import { bannerModel } from '../Models/HomeBanner.js'


const app = express
const route = app.Router()

// Add image banner

route.post('/addbanner', async (req, res) => {
    try {
        const { title, aboutdecription, bannerimageurl } = req.body
        if (!title || !aboutdecription || !bannerimageurl) {
            return res.status(401).json({
                message: 'Provide all data',
                success: false
            })
        }
        const addbann = await bannerModel.create({ title, aboutdecription, bannerimageurl })
        return res.status(200).json({
            message: 'banner addded',
            success: true,
            bann: addbann
        })
    } catch (error) {
        console.log(error)
    }
})

// Get allbannerimage
route.get('/getallbann', async (req, res) => {
    try {
        const getimbann = await bannerModel.find()
        if (!getimbann) {
            return res.status(401).json({
                message: 'No banner avalilable',
                success: false
            })
        }
        return res.status(200).json({
            // message: 'Banner images',
            banner: getimbann
        })
    } catch (error) {
        console.log(error)
    }
})

// Delete banner
route.delete('/deletebann/:id', async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(401).json({ message: 'Banner not found to delete' })
        }
        const delet = await bannerModel.findByIdAndDelete(id)
        return res.status(201).json({
            message: 'deleted',
            delet
        })
    } catch (error) {
        console.log(error)
    }
})

export default route
// https://netfree.cc/pv/playlist.php?id=0HNZIYOI76383DKI61QMTROL4K&tm=1742139
// https://netfree.cc/pv/post.php?id=0HNZIYOI76383DKI61QMTROL4K&t=1742139892