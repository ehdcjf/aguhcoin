const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = process.env.PORT || 3500 
const nunjucks = require('nunjucks');
require('dotenv').config();

const db = require('./models');
const logger = require('./logger');
const router = require('./routes');
db.sequelize.sync({force:true})
.then(_=>{
  console.log(`DB Connection Success`);
})
.catch(err=>{
  console.log(`DB disconnection ${err}`);
})

app.use(morgan('dev'));

app.set('view engine','html');
nunjucks.configure('views',{express:app});


app.use('/',router)

app.use((req,res,next)=>{
  const error = new Error(`${req.method} ${req.url} 정보가 없습니다.`);
  error.status = 404;
  logger.error(error.message);
  res.render('404');
})



app.listen(PORT,()=>{
  console.log(`Hello port ${PORT}`)
})