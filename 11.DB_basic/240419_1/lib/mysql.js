const mysql = require("mysql");

const createConnection = () => {
  return mysql.createConnection({
    user: "aws",
    password: "1234qwer!@",
    database: "AWS_TEST",
    host: "localhost",
    port: 3306,
  });
};
// const connection = {()=>{
//     this = mysql.createConnection({
//       user: "aws",
//       password: "1234qwer!@",
//       database: "AWS_TEST",
//       host: "localhost",
//       port: 3306,
//     });
//   }};

// connection.connect();
const init = () => {
  const connection = createConnection();
  //   connection();
  connection.connect();

  connection.query("DROP TABLE IF EXISTS express_todo");
  connection.query("DROP TABLE IF EXISTS express_user");

  connection.query(`CREATE TABLE express_user (
id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
user_id VARCHAR(20) NOT NULL UNIQUE,
password VARCHAR(64) NOT NULL,
name VARCHAR(10),
created_at DATETIME DEFAULT NOW()
)`);

  connection.query(`CREATE TABLE express_todo(
id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
user_id VARCHAR(20),
working VARCHAR(50) NOT NULL,
is_complete BOOLEAN DEFAULT FALSE,
created_at DATETIME DEFAULT NOW(),
limit_time DATETIME NOT NULL,
deleted_at DATETIME DEFAULT null,
todo_id INT UNSIGNED,
FOREIGN KEY(user_id) REFERENCES express_user(user_id)
ON UPDATE CASCADE ON DELETE SET NULL,
FOREIGN KEY(todo_id) REFERENCES express_todo(id)
ON UPDATE CASCADE ON DELETE SET NULL
);`);

  connection.end();
};

const user = {
  create: (user) => {
    const connection = createConnection();
    connection.connect();
    connection.query(
      "INSERT INTO express_user (user_id, password, name) VALUES (?, ?, ?)",
      [user.id, user.pw, user.name],
      (err, results, fields) => {
        if (err) console.error(err);
        else {
          console.log(results);
        }
      }
    );
    connection.end();
  },
  get: (id) =>
    new Promise((resolve, reject) => {
      const connection = createConnection();
      //   connection();
      connection.connect();
      connection.query(
        "SELECT * FROM express_user WHERE user_id-? and deleted_at IS NULL",
        [id],
        (err, results, fields) => {
          connection.end();
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    }),
};

module.exports = { init, user };
