import { Router } from "express";
import {
  deleteEvent,
  editEvent,
  getEventByFullText,
  getEventById,
  getEvents,
  getEventsOnCategory,
  getEventsOnFilter,
  getFavorites,
  getReplies,
  getReviewsOnEventId,
  postEvent,
  postFavorite,
  postRegister,
  postReview,
} from "../controller/event.controller";
import { upload } from "../controller/upload";

const router = Router();

router.get("/", getEvents);
router.get("/:eventId", getEventById);
router.get("/reply/:id", getReplies);
router.get("/filter", getEventsOnFilter);
router.get("/favorites/:eventId", getFavorites);
router.get("/reviews/:userId", getReviewsOnEventId);
router.get("/category", getEventsOnCategory);
router.get("/q", getEventByFullText);

router.post("/", upload.single("image"), postEvent);
router.put("/", upload.single("image"), editEvent);
router.post("/favorites", postFavorite);
router.post("/register", postRegister);
router.post("/reviews", postReview);

router.delete("/:eventId", deleteEvent);

export default router;
