const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const multer = require("multer");

const app = express();

//jwt secretkey
const secretKey = require("./app/config/auth.config").secret;

//cors
var corsOptions = {
  origin: "*",
  credentials: false,
  Headers: "x-access-token"

};
app.use(cors(corsOptions));
app.use(cookieParser(secretKey));

app.use(bodyParser.json({ limit: "50mb" }));

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

//db
// const db = require("./app/models/user.model.js");

//initial route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Friendzone API!" });
});

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/gender.routes")(app);
require("./app/routes/event.routes")(app);
require("./app/routes/category.routes")(app);
require("./app/routes/chat.routes")(app);
require("./app/routes/pointTransaction.routes")(app);
require("./app/routes/search.routes")(app);
require("./app/routes/discount.routes")(app);
require("./app/routes/report.routes")(app);
require("./app/routes/analyst.routes")(app);
require("./app/routes/eventInvited.routes")(app);
require("./app/routes/admin.routes")(app);


//listening
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Friendzone API Server is running on port ${PORT}.`);
});

var publicDir = require("path").join(__dirname, "/data");
app.use(express.static(publicDir));
