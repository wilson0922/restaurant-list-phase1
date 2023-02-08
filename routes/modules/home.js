const express = require("express");
const router = express.Router();

const Restaurant = require("../../models/Restaurant");

// 主頁: GET瀏覽全部餐廳
router.get("/", (req, res) => {
  Restaurant.find() //拿全部資料
    .lean()
    .then((restaurantsData) => res.render("index", { restaurantsData }))
    .catch((error) => console.error(error));
});

module.exports = router;
