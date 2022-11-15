const express = require("express");
const router = express.Router();
const db = require("../modules/db_connect");
const upload = require("../modules/upload-img");

router.get("/:shop_sid", async (req, res) => {
  const data = {
    products: {},
    options_types: {},
  };
  const { shop_sid } = req.params;

  // 從資料庫取得商品資料與其類別名稱
  const product_sql =
    "SELECT p.*,pt.name type_name FROM `products` p JOIN `products_types` pt ON p.`products_type_sid`=pt.`sid` WHERE p.shop_sid=?";
  const [product_rows] = await db.query(product_sql, [shop_sid]);

  // 從資料庫取得選項類別的資料
  const option_type_sql =
    "SELECT ot.*, otpr.product_sid FROM `options_types` ot JOIN `options_types_products_relation` otpr ON ot.sid=otpr.options_type_sid JOIN `products` p ON otpr.product_sid=p.sid WHERE p.shop_sid=?";
  const [option_type_rows] = await db.query(option_type_sql, [shop_sid]);

  data.products = product_rows;
  data.options_types = option_type_rows;

  res.json(data);
});

module.exports = router;
