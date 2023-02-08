const express = require("express");
const router = express.Router();

const Restaurant = require("../../models/Restaurant");

// 設定路由 get 搜尋特定餐廳
router.get("/search", (req, res) => {
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
router.get("/new", (req, res) => {
  res.render("new");
});

// 設定路由: POST新餐廳資料
router.post("/", (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

// 設定路由: GET瀏覽個別餐廳資料
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Restaurant.findById(id)
    .lean()
    .then((restaurantsData) => res.render("show", { restaurantsData }))
    .catch((error) => console.log(error));
});

// 設定路由: GET編輯餐廳頁
router.get("/:id/edit", (req, res) => {
  const id = req.params.id;
  Restaurant.findById(id)
    .lean()
    .then((restaurantData) => res.render("edit", { restaurantData }))
    .catch((err) => console.log(err));
});

// 設定路由: PUT更新餐廳
router.put("/:id", (req, res) => {
  const id = req.params.id;
  Restaurant.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch((err) => console.log(err));
});

// 設定路由: DELETE刪除餐廳
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Restaurant.findByIdAndDelete(id)
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

module.exports = router;
