const express = require('express');
const mongoose = require('mongoose');
const authorsRoute = require('./routers/authorRouther');
const postRoute=require('./routers/postRouter')
const emailRoute = require('./routers/sendEmail')
const commentRoute=require('./routers/commentRouther');
const loginRoute = require('./routers/login');
const cors = require('cors')
const path = require('path')    
const githubRoute = require('./routers/github');

require('dotenv').config();

const PORT = 4000;

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
  }))
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.json());


app.use('/', authorsRoute); // Usa 'authorsRoute' come middleware
app.use('/', postRoute);
app.use('/', emailRoute); 
app.use('/', commentRoute);
app.use('/', loginRoute);
app.use('/', githubRoute);


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
