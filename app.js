const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose')

require('dotenv').config()

const models = require('./models')
const services = require('./services')

const indexRouter = require('./routes/index');
const taskRouter = require('./routes/task');
const userRouter = require('./routes/user')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/task', taskRouter);
app.use('/user',userRouter)


app.models = {
  task:models.task,
  user:models.user,
  token:models.token
}

app.services = {
  task:new(services.task)(app.models),
  user:new(services.user)(app.models)
}



mongoose.connect(process.env.MONGOOSE_CONNECT_URL,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
).then(()=>console.log("mongodb connected")).catch((err)=>console.log(err.message))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // // render the error page
  // res.status(err.status || 500);
  // res.render('error');
  res.json({err:err.message})
});

module.exports = app;