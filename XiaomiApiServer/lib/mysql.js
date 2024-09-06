var mysql = require("mysql");
var config = require("../config/default.js");

var pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  port: config.database.PORT
});

let query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
          connection.release();
        });
      }
    });
  });
};



// 查询所有分类数据
exports.get_field_course = () => {
  let _sql = `select * from course_field;`;
  // console.log('query(_sql)',query(_sql))
  return query(_sql);
};


// 查询分类所对应的数据
exports.get_field_course_list = (field) => {
  let _sql ='';
  if(field==-1) {
    _sql = `select * from course_field_list`
  } else {
    _sql = `select * from course_field_list where fieldType = ${field}`
  }
  return query(_sql);
}