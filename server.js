require('dotenv').config();
const express = require('express');
const connectDB = require('./db/connect');
const session = require('express-session');
const app = express();
app.set('view engine', 'ejs')

const taskRouter = require('./routes/tasks');
const setMessage = require('./middleware/message');

app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(express.urlencoded({extended: false}));
app.use('/tasks', setMessage, taskRouter);

const port = 8080;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();


