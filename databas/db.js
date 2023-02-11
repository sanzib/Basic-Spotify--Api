import mongoose from "mongoose";

const connectDB = async()=>{
    const res= mongoose.connect(process.env.DB)
    if(res){
        console.log('Database connected successfully')
    }
}
export default connectDB;