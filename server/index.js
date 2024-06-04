require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRouter');


//DOTENV const
const PORT = 3000 || process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

//ExpressMiddleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//homepage route
app.get('/', (req, res) => {
    res.send('Homepage');
});

//routes
app.use('/api/posts', blogRoutes);

//Mongoose application connection
mongoose.set("strictQuery", false);
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Successfully connected to MongoDb');
        app.listen(PORT, () => {
            console.log(`Your server is running on port ${PORT}`);
        });
    }).catch((error) => {
        console.log(error);
    });