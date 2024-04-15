const router = require("express").Router();
const multer = require("multer");

router.post(
  "/uploads",
  multer({
    storage: multer.diskStorage({
      destination: (req, file, callback) => {
        callback(null, "./uploads");
      },
      filename: (req, file, callback) => {
        callback(null, `${Date.now()}_${file.originalname}`);
      },
    }),
  }).array("img"),
  (req, res) => {
    res.redirect("/");
  }
);
module.exports = router;
