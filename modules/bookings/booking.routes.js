import express from "express";
import { createBooking, getBookings,cancelBooking } from "./booking.controller.js";
const router = express.Router();

router.post("/:tourId/book", createBooking);
router.get("/myBookings/:userId", getBookings);
router.delete("/:bookingId/cancel", cancelBooking);

export default router;
