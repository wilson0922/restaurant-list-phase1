const mongoose = require("mongoose");

// 載入model&種子資料
const Restaurant = require("../restaurant");
const restaurantList = require("../../restaurant.json").results;

// 連線至資料庫
mongoose.connect(
  "mongodb+srv://wilson0922:abcabc123@cluster0.akbk61g.mongodb.net/restaurantlist?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// 取得資料連線狀態顯示訊息
const db = mongoose.connection;
db.on("error", () => console.log("Mongodb error"));
db.once("open", () => {
  console.log("Mongodb connected");

  // 資料庫建立種子資料
  Restaurant.create(restaurantList)
    .then(() => {
      console.log("restaurantSeeder built");
    })
    .catch((err) => console.log(err));
});
console.log(restaurantList);
