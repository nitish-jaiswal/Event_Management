import mongoose from "mongoose";

export const dbConnect= ()=>{
    mongoose.connect(process.env.DATABASE_URI,{
        dbName:"TASK"
    }
    ).then(
        console.log("Connected to DataBase")
    ).catch(err =>{
        console.log(`Some error occured while connecting to the DataBase ${err}`)
    })
}