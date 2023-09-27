import { Router } from "express";
import {
  follow,
  getReferrals,
  getUserById,
  unfollow,
  webhook,
} from "../controller/user.controller";
import bodyParser from "body-parser";

const router = Router();

router.get("/referrals", getReferrals);

router.post("/follow", follow);
router.post("/unfollow", unfollow);
router.post("/webhook", bodyParser.raw({ type: "application/json" }), webhook);
router.get("/:id", getUserById);

export default router;
