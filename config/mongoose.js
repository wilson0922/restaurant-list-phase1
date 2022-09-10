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

module.exports = db;
