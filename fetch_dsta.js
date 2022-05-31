const mysql = require("mysql");
const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "db",
  multipleStatements: true,
});
connection.query('select * from r',(err,result,fields)=>{
    if(err){
        return console.log(err);

    }
    return console.log(result);
});
