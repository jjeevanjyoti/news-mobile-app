const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressValidator = require('express-validator');
const morgan = require('morgan');

const app = express();
require('dotenv').config();

app.use(cors());

const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');

//db connection
mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true },
    { useCreateIndex: true }
  )
  .then(() => console.log('db connected'))
  .catch((err) => console.error(err));
//when error
mongoose.connection.on('error', (err) => {
  console.log(`DB connection error: ${err.message}`);
});

//midlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

//routes middleware
app.use('/api', authRoute);
app.use('/api', postRoute);

//PORT
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
