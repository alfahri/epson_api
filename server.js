const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: [
    "http://localhost:8081",
    "http://192.168.20.66:8081",
    "http://192.168.20.66:8082",
    "http://localhost:8082"
  ]
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.json({ message: "Berhasil test" });
});

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/email.routes')(app);

const db = require("./models");
const Role = db.role;

// Selama dev pake ini
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

// Kalo udah prod pake ini
// db.sequelize.sync();

// Kalo udah live apus aja
// function initial() {
//   Role.create({
//     id: 1,
//     nama: "user"
//   });
 
//   Role.create({
//     id: 2,
//     nama: "moderator"
//   });
 
//   Role.create({
//     id: 3,
//     nama: "admin"
//   });
// }

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});