const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('/etc/letsencrypt/live/staging.epsonvirtuallaunching.com/privkey.pem', 'utf8');
var certificate = fs.readFileSync('/etc/letsencrypt/live/staging.epsonvirtuallaunching.com/fullchain.pem', 'utf8');
var path = require('path');

var credentials = {key: privateKey, cert: certificate}

const app = express();

var corsOptions = {
  origin: [
    "https://staging.epsonvirtuallaunching.com",
    "http://staging.epsonvirtuallaunching.com",
    "http://localhost:8080",
    "http://localhost:8081",
    "http://10.103.1.214:8080",
    "http://10.103.1.214:8081"
  ]
};

app.use("/public", express.static(path.join(__dirname, "public/uploads")))
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.json({ message: "Berhasil test" });
});

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/email.routes')(app);
require('./routes/event.routes')(app);

const db = require("./models");
const Role = db.role;
const UserAdmin = db.useradmin;
const Chat = db.chat;

// Selama dev pake ini
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Db');
//   // initial();
//   UserAdmin.create({
//     id: 1,
//     email: "m.alfahri98@gmail.com",
//     password: "$2a$08$kgMXpRRQdgfGT08hYTgljO.Z6mHH/.l6Y.W7VJQnDI8CQnSAKYeEm"
//   });
// });

// Kalo udah prod pake ini
db.sequelize.sync();

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

const PORT = process.env.PORT || 3000;
// const httpServer = app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
const io = require('socket.io')(httpServer);

httpServer.listen(3443);
httpsServer.listen(3000);
io.on("connection", socket => {
  socket.on("terimaChat", data => {
    Chat.create({
      id_user: data.id,
      isi_pesan: data.message,
      id_agenda: data.institusi,
      first_name: data.first_name,
      last_name: data.last_name,
    }).then(chat => {
      console.log("berhasil simpan chat")
    })
    console.log(data)
    io.emit("kirimChat", data)
  })
})