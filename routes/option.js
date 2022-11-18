const express = require("express");
const router = express.Router();
const db = require("../modules/db_connect");

router.get("/:shop_sid", async (req, res) => {
  const data = {
    options_types: {},
    options: {},
  };
  const { shop_sid } = req.params;
  const option_type_sql = "SELECT * FROM `options_types` WHERE `shop_sid`=?";
  const [option_type_rows] = await db.query(option_type_sql, [shop_sid]);

  const option_sql =
    "SELECT o.*, ot.shop_sid FROM `options` o JOIN `options_types` ot ON o.options_type_sid=ot.sid WHERE ot.shop_sid=?";
  const [option_rows] = await db.query(option_sql, [shop_sid]);

  data.options_types = option_type_rows;
  data.options = option_rows;

  res.json(data);
});

module.exports = router;
