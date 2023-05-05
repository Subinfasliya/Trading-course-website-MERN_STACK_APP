const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const connectDb = require('./config/connectDb.js');



// config env
dotenv.config();

//database
connectDb();
//rest object
const app = express();

//middle wear..
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());




//routes
app.use('/api/v1/users',require('./routes/userRouter.js'))
app.use('/api/v1/videos',require('./routes/videoRouter.js'))

//static files
app.use(express.static(path.join(__dirname, './client/build')))
// //Rest API

app.get('*',function(req,res){
     res.sendFile(path.join(__dirname,'./client/build/index.html'))
})
//PORT
const PORT = process.env.PORT || 8080;

//run listen

app.listen(PORT , ( ) => {
     console.log(`server runniing on ${process.env.DEV_MODE} mode on ${PORT}`);
});