module.exports = {
  HOST: "192.168.10.31",
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