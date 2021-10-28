module.exports = {
  HOST: "rm-d9jx07jt761qneb86ro.mysql.ap-southeast-5.rds.aliyuncs.com",
  USER: "alfa",
  PASSWORD: "db_devepson",
  DB: "db_devepson",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};