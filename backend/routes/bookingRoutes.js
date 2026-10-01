import { Router } from "express";
import * as BookingController from "../controllers/bookingController.js";

const router = Router();

// Booking Forms Submissions (Safari, City Tour, General Modal)
router.get("/", BookingController.getAllBookings);
router.get("/:id", BookingController.getBookingById);
router.post("/safari", BookingController.createSafariBooking);
router.post("/city-tour", BookingController.createCityTourBooking);
router.post("/general", BookingController.createGeneralBooking);
router.patch("/:id/status", BookingController.updateBookingStatus);
router.delete("/:id", BookingController.deleteBooking);

export default router;
