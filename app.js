const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const routes = require("./routes");
require("./config/mongoose");

const app = express();
const port = 3000;

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
