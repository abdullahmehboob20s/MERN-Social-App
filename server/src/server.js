require("dotenv").config();
let express = require("express");
let app = express();
let cors = require("cors");
let cookieParser = require("cookie-parser");
let port = process.env.PORT;
let AuthRoutes = require("./routes/AuthRoutes");
let TodoRoutes = require("./routes/TodoRoutes");
let path = require("path");
require("./db/connection");
let CommentsRoutes = require("./routes/CommentsRoutes");

app.use(express.static(path.join(__dirname, "./uploads")));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/auth", AuthRoutes);
app.use("/todo", TodoRoutes);
app.use("/comments", CommentsRoutes);

app.get("/", (req, res) => res.send("This Is Home Of Api"));
app.listen(port, "127.0.0.1", () =>
  console.log("app is running on port " + port)
);
