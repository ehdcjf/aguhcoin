const dbinit=()=>{
  const mysql = require('mysql2')
  const fs = require('fs');
  const sql = fs.readFileSync("./dbinit.sql").toString();
  const {config} = require('./config/dbconnection')

  const con = mysql.createConnection(config);
  
  con.connect(function(err) {
    if (err) throw err;
    
    const result = con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Database created");
      // console.log(result)
    });
  });
}


module.exports={
  dbinit,
}