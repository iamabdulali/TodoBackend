import mongoose from "mongoose"

export const connectDB = () =>{
     mongoose.connect("mongodb://localhost:27017",{
    dbName: "API"
}).then(() =>{
    console.log("DATABASE IS CONNECTED")
}).catch(e =>{
    console.log(e)
}) 
}
