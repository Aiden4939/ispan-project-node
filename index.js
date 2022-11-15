require("dotenv").config();
const express = require("express");
const multer = require("multer");
const app = express();
const db = require("./modules/db_connect");
const cors = require("cors");
const upload = require("./modules/upload-img");

// middleware
// app.use(multer());
app.use(express.json())
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000"], //這邊改成他的伺服器(白名單)，有多個的時候用陣列表示
    optionsSuccessStatus: 200,
  })
);

app.get("/", (req, res) => {
  res.send("This is my homepage");
});

app.get('/store-list',async (req, res) => {
  const sql = 'SELECT * FROM `shop` WHERE 1'
  const [rows] = await db.query(sql)
  res.send(rows)
})

app.use("/store-admin/overview", require("./routes/overview"));
app.use("/store-admin/type", require("./routes/type"));
app.use("/store-admin/product", require("./routes/product"));
// app.use("/option", require("./routes/option"));

app.get("*", (req, res) => {
  res.status(404).send("This page not found");
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`port is running on port ${process.env.SERVER_PORT}.`);
});
