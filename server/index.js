const path = require("path");
const express = require("express");
const morgan = require("morgan");
// sentry
const cors = require("cors");

const connectDb = require("./services/db.service");
const apiRoute = require("./routes/index.route");
const appConfig = require("./config/app.config");

const app = express();

app.use(express.json());
app.use(morgan("combined"));
app.use(cors());

// Routes
// API Routes
app.use("/api", apiRoute);
// UI Routes
app.use(express.static(path.resolve(__dirname, "../dist")));
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../dist/index.html"));
});
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route does not exist!" });
});


Promise.resolve()
  .then(() => connectDb())
  .then(() => {
    const PORT = appConfig.PORT;
    app.listen(PORT, () => console.log(`Server Started: http://localhost:${PORT}`));
  }).catch(err=>{
    console.error("crashed: ", err)
  })
