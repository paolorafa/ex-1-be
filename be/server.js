const express = require('express');
const mongoose = require('mongoose');
const authorsRoute = require('./routers/authorRouther');
const postRoute=require('./routers/postRouter')
const cors = require('cors')
require('dotenv').config();

const PORT = 3500;

const app = express();
app.use(cors())
app.use(express.json());


app.use('/', authorsRoute); // Usa 'authorsRoute' come middleware
app.use('/', postRoute);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error during db connect'));
db.once('open', () => {
    console.log('database connection');
});

app.listen(PORT, () => {
    console.log(`server up and reading on port ${PORT}`);
});
