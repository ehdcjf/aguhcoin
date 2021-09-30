const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 3500 
const dbsetting = require('./dbsetting')
// const nunjucks = require('nunjucks');
const mysql = require('mysql2')
require('dotenv').config();

const logger = require('./logger');
const router = require('./routes');

//시퀄라이즈 걷어내기 
// const db = require('./models');
// db.sequelize.sync({force:false})
// .then(_=>{
//   console.log(`DB Connection Success`);
// })
// .catch(err=>{
//   console.log(`DB disconnection ${err}`);
// })

//DB 만들기.
dbsetting.dbinit();
app.use(morgan('dev'));

app.use(
  cors({
      origin: 'http://localhost:3001',
      credentials: true

  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// app.set('view engine','html');
// nunjucks.configure('views',{express:app});


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