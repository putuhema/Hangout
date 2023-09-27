import { Router } from "express";
import {
  deleteEvent,
  deletePromo,
  editEvent,
  getEventByFullText,
  getEventById,
  getEvents,
  getEventsOnCategory,
  getEventsOnFilter,
  getFavorites,
  getPromo,
  getReplies,
  getReviewsOnEventId,
  postEvent,
  postFavorite,
  postPromo,
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
router.get("/promo/:eventId", getPromo);
router.get("/reviews/:userId", getReviewsOnEventId);
router.get("/category", getEventsOnCategory);
router.get("/q", getEventByFullText);

router.post("/", upload.single("image"), postEvent);
router.put("/", upload.single("image"), editEvent);
router.post("/promo", postPromo);
router.post("/favorites", postFavorite);
router.post("/register", postRegister);
router.post("/reviews", postReview);

router.delete("/:eventId", deleteEvent);
router.delete("/promo/:eventId", deletePromo);

export default router;
