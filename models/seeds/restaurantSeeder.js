const Restaurant = require("../restaurant");

const db = require("../../config/mongoose");

const restaurantList = require("../../restaurant.json").results;

db.once("open", () => {
  // 資料庫建立種子資料
  Restaurant.create(restaurantList)
    .then(() => {
      console.log("restaurantSeeder built");
    })
    .catch((err) => console.log(err));
});
