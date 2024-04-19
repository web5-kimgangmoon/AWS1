const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "aws",
  password: "1234qwer!@",
  database: "AWS_TEST",
});

connection.connect();

// connection.query(
//   "INSERT INTO test (id, name, nick) VALUES (?, ?, ?)",
//   [8, "arr1", "arr1"],
//   (err, results, fields) => {
//     console.log(" err : ", err);
//     console.log(" result : ", results);
//     console.log(" field : ", fields);
//   }
// );
const findInTest = (id) => {
  connection.query(
    "SELECT * FROM test WHERE id=?",
    [id],
    (err, results, fields) => {
      console.log(" err : ", err);
      console.log(" result : ", results);
      //   console.log(" field : ", fields);
    }
  );
};

findInTest(3);
console.log(mysql.Types);

connection.end();

// ALTER USER aws IDENTIFIED WITH mysql_native_password BY "1234qwer!@";
