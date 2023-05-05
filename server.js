const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");

//Database Connection
require("./db/connection")();

const PORT = process.env.PORT || 3000;
const staticPath = path.join(__dirname, "public");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticPath));
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", "views");

app.use(require("./routes/pages"));
app.use("/api/users", require("./routes/user"));
app.use("/api/properties", require("./routes/land"));
app.use("/api/bookings", require("./routes/bookings"));

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT} `);
});
