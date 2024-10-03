const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password:"Klu173017*",
  database: "bookwormhaven",
});

// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to the database:', err.stack);
//     return;
//   }
  
//   console.log('Connected to MySQL database');
//   // const sql='select * from authors';
//   connection.query(sql,(err,res)=>{
//     if(err){
//       console.log("err");

//     }
//     console.log(res);
//   })
// });

connection.connect((err) => {
  if (err) {
      console.error('Error connecting to the database:', err);
      return;
  }
  console.log('Connected to the MySQL database.');
});

module.exports = connection;
module.exports = connection;
