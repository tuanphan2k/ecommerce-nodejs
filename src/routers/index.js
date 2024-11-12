import express from "express";
import accessRouter from "./access/index.js";
import { apiKey, permissions } from "../auth/checkAuth.js";

const router = express.Router();

// router.get("", (req, res, next) => {
//   return res.status(200).json({
//     message: "Welcome to the API",
//   });
// });

// check apiKey
router.use(apiKey);

// check permission
router.use(permissions("0000"));

router.use("/v1/api", accessRouter);

export default router;
