import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

 
const connectToMongoDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://hirdeshkumar639652_db_user:adcm3fOHdT0ZKT2n@cluster0.uunohrq.mongodb.net/");
        console.log('✅ Connection to database established!!');
    } catch (error) {
        console.error('❌ Could not connect to the database:', error.message);
        process.exit(1);
    }
}

export default connectToMongoDB;