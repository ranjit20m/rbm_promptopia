import mongoose from "mongoose";
let isConnected = false; // to track the connection status

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        // mongoose.connect(uri, options)
        await mongoose.connect(process.env.MONGODB_URI, { 
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        isConnected = true;
        console.log('MongoDB is connected');
    } catch (error) {
        console.log(error);   
    }   
}
