import mongoose from "mongoose";

export const database = async ()=>{
   try {
   await mongoose.connect(process.env.MONGOURI)
        console.log('database connected successfully')
    
   } catch (error) {
    console.log(error)
   }
}