const dbinit=()=>{
  const mysql = require('mysql2')
  const fs = require('fs');
  const sql = fs.readFileSync("./dbinit.sql").toString();

  let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    multipleStatements: true // this allow you to run multiple queries at once.
  });
  
  con.connect(function(err) {
    if (err) throw err;
    
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });
  });
}


module.exports={
  dbinit,
}