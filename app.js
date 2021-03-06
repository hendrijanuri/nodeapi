const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();

// db
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() => console.log('DB Connected'));

mongoose.connection.on("error", err => {
    console.log(`DB Connection error: ${err.message}`);
});

// Post routes 
const postRoutes = require('./routes/post');

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(expressValidator());
app.use("/", postRoutes);

const port = process.env.PORT || 2020; 
app.listen(port, () => {
    console.log(`A Node Js API is listening on port: ${port}`);
});