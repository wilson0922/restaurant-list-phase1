const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const Restaurant = require("./models/Restaurant");

const routes = require("./routes");

const app = express();
const port = 3000;
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://wilson0922:abcabc123@cluster0.akbk61g.mongodb.net/restaurantlist?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// 資料庫連線狀態
const db = mongoose.connection;
// 連線異常
db.on("error", () => {
  console.log("mongodb error!");
});
// 連線成功
db.once("open", () => {
  console.log("mongodb connected!");
});

//設定hbs樣板引擎
app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

// 設定body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(routes);

// setting Bootstrap static files
app.use(express.static("public"));

// start and listen on the express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${3000}`);
});
