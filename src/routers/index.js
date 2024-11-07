import express from "express";
import accessRouter from "./access/index.js";

const router = express.Router();

// router.get("", (req, res, next) => {
//   return res.status(200).json({
//     message: "Welcome to the API",
//   });
// });

router.use("/v1/api", accessRouter);

export default router;