const express = require('express');
const cors = require('cors');
const connectDB = require('./Config/config');
const userRoute = require('./Route/userRouter');
const serieRouter = require('./Route/serieRouter');
const movieRouter = require('./Route/movieRouter');
const posterRouter = require('./Route/posterRouter');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/user', userRoute);
app.use('/api/poster', posterRouter);
app.use('/api/serie', serieRouter);
app.use('/api/movie', movieRouter);
connectDB();
app.listen(process.env.PORT, () => {
  console.log('server is running');
});
