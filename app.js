const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const Restaurant = require("./models/Restaurant");

const app = express();
const port = 3000;
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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

// setting Bootstrap static files
app.use(express.static("public"));

// 主頁: GET瀏覽全部餐廳
app.get("/", (req, res) => {
  Restaurant.find() //拿全部資料
    .lean()
    .then((restaurantsData) => res.render("index", { restaurantsData }))
    .catch((error) => console.error(error));
});

// 設定路由 get 搜尋特定餐廳
app.get("/search", (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase();
  return Restaurant.find()
    .lean()
    .then((restaurant) => {
      const restaurantsSearch = restaurant.filter((data) => {
        return (
          data.name.toLowerCase().includes(keyword) ||
          data.category.includes(keyword)
        );
      });
      res.render("index", {
        restaurantsData: restaurantsSearch,
        keyword: keyword,
      });
    })
    .catch((error) => console.log(error));
});

// 設定路由：GET新增餐廳頁
app.get("/restaurants/new", (req, res) => {
  res.render("new");
});

// 設定路由: POST新餐廳資料
app.post("/restaurants", (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

// 設定路由: GET瀏覽個別餐廳資料
app.get("/restaurants/:id", (req, res) => {
  const id = req.params.id;
  Restaurant.findById(id)
    .lean()
    .then((restaurantsData) => res.render("show", { restaurantsData }))
    .catch((error) => console.log(error));
});

// 設定路由: GET編輯餐廳頁
app.get("/restaurants/:id/edit", (req, res) => {
  const id = req.params.id;
  Restaurant.findById(id)
    .lean()
    .then((restaurantData) => res.render("edit", { restaurantData }))
    .catch((err) => console.log(err));
});

// 設定路由: PUT更新餐廳
app.put("/restaurants/:id", (req, res) => {
  const id = req.params.id;
  Restaurant.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch((err) => console.log(err));
});

// 設定路由: DELETE刪除餐廳
app.delete("/restaurants/:id", (req, res) => {
  const id = req.params.id;
  Restaurant.findByIdAndDelete(id)
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

// start and listen on the express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${3000}`);
});
