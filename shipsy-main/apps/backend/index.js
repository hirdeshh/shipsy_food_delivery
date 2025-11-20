import dotenv from 'dotenv';
dotenv.config();


import express from 'express';
//import dotenv from 'dotenv';
import connectToMongoDB from './config/db.js';
import Home from './routes/Home.js';
import Auth from './routes/Auth.js';
import Shipment from './routes/Shipment.js';
import cors from "cors";

//dotenv.config();

const app = express();

// ✅ Middleware to parse incoming JSON requests
app.use(express.json());

app.use(cors());

const port = process.env.PORT || 5000;

// Connect to the database and then start the server
connectToMongoDB().then(() => {
    app.use('/', Home);
    app.use('/auth', Auth);
    app.use('/shipment', Shipment);

    app.listen(port, () => {
        console.log(`✅ Server running at: http://localhost:${port}/`);
    });
}).catch((error) => {
    app.get('*', (req, res) => {
        res.send("☠️ Server is disconnected!!");
        console.log("Server throwing error : ", error.message);
    })
});