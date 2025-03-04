import express from "express";
import { createTour, deleteTour, getTourById, getTours, updateTour } from "./tour.controller.js";

const router = express.Router();

router.post("/", createTour);

router.get("/", getTours);

router.get("/:tourId", getTourById);

router.put("/:tourId", updateTour);

// router.delete("/:tourId"), deleteTour;

export default router;
