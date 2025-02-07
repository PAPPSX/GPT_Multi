import mongoose from "mongoose";
import dotenv from 'dotenv';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_CONNECT);
        console.log(process.env.MONGO_DB_CONNECT);
        console.log('Successfully Connected To Mongodb');
    } catch (error) {
        console.log('Failed to connect to mongodb error:',error);
    }  
};

export default connectDB;