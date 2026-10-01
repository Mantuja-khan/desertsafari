import Booking from "../models/Booking.js";

// Helper to sanitize and validate phone numbers
function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
}

// POST /api/bookings/safari - Book Your Safari Form Submission
export async function createSafariBooking(req, res) {
  try {
    const {
      tourTitle = "Desert Safari Tour",
      name,
      email,
      phone,
      date,
      guests = 1,
      pickupLocation = "",
      specialNotes = "",
      totalAmount = 0,
      currency = "AED",
    } = req.body;

    if (!name || !email || !phone || !date) {
      return res.status(400).json({
        success: false,
        message: "Full Name, Email, Phone number, and Date are required for Safari bookings",
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    const booking = await Booking.create({
      bookingType: "safari",
      tourTitle,
      customerName: name.trim(),
      customerEmail: email.trim().toLowerCase(),
      customerPhone: phone.trim(),
      tourDate: date,
      guests: Number(guests) || 1,
      pickupLocation: pickupLocation.trim(),
      specialNotes: specialNotes.trim(),
      totalAmount: Number(totalAmount) || 0,
      currency,
      status: "pending",
    });

    return res.status(201).json({
      success: true,
      message: "Your Desert Safari booking has been received successfully! Our team will contact you shortly.",
      data: booking,
    });
  } catch (error) {
    console.error("Safari booking error in MongoDB:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "An error occurred while saving your safari booking",
    });
  }
}

// POST /api/bookings/city-tour - City Tour Booking Form Submission
export async function createCityTourBooking(req, res) {
  try {
    const {
      tourTitle = "Dubai City Tour",
      name,
      email,
      phone,
      date,
      guests = 1,
      pickupLocation = "",
      specialNotes = "",
      totalAmount = 0,
      currency = "AED",
    } = req.body;

    if (!name || !email || !phone || !date) {
      return res.status(400).json({
        success: false,
        message: "Full Name, Email, Phone number, and Date are required for City Tour bookings",
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    const booking = await Booking.create({
      bookingType: "city-tour",
      tourTitle,
      customerName: name.trim(),
      customerEmail: email.trim().toLowerCase(),
      customerPhone: phone.trim(),
      tourDate: date,
      guests: Number(guests) || 1,
      pickupLocation: pickupLocation.trim(),
      specialNotes: specialNotes.trim(),
      totalAmount: Number(totalAmount) || 0,
      currency,
      status: "pending",
    });

    return res.status(201).json({
      success: true,
      message: "Your Dubai City Tour booking has been confirmed! Our tour manager will contact you with pickup details.",
      data: booking,
    });
  } catch (error) {
    console.error("City tour booking error in MongoDB:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "An error occurred while saving your city tour booking",
    });
  }
}

// POST /api/bookings/general - Normal "Book Now" Button Modal Form
export async function createGeneralBooking(req, res) {
  try {
    const {
      tourTitle = "General Experience",
      bookingType = "general",
      name,
      email,
      phone,
      date,
      guests = 1,
      pickupLocation = "",
      specialNotes = "",
      totalAmount = 0,
      currency = "AED",
    } = req.body;

    if (!name || !email || !phone || !date) {
      return res.status(400).json({
        success: false,
        message: "Full Name, Email, Phone number, and Date are required to book your experience",
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    const booking = await Booking.create({
      bookingType: ["safari", "city-tour", "general"].includes(bookingType) ? bookingType : "general",
      tourTitle,
      customerName: name.trim(),
      customerEmail: email.trim().toLowerCase(),
      customerPhone: phone.trim(),
      tourDate: date,
      guests: Number(guests) || 1,
      pickupLocation: pickupLocation.trim(),
      specialNotes: specialNotes.trim(),
      totalAmount: Number(totalAmount) || 0,
      currency,
      status: "pending",
    });

    return res.status(201).json({
      success: true,
      message: "Thank you! Your reservation has been recorded. We will contact you immediately on WhatsApp/Email.",
      data: booking,
    });
  } catch (error) {
    console.error("General booking error in MongoDB:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "An error occurred while saving your booking",
    });
  }
}

// GET /api/bookings - Get all bookings with filtering for Admin Panel
export async function getAllBookings(req, res) {
  try {
    const { type, status, search, page = 1, limit = 100 } = req.query;
    const query = {};

    if (type && type !== "all") {
      query.bookingType = type;
    }

    if (status && status !== "all") {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { customerName: { $regex: search, $options: "i" } },
        { customerEmail: { $regex: search, $options: "i" } },
        { customerPhone: { $regex: search, $options: "i" } },
        { tourTitle: { $regex: search, $options: "i" } },
      ];
    }

    const bookings = await Booking.find(query)
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await Booking.countDocuments(query);

    return res.json({
      success: true,
      data: bookings,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
      },
    });
  } catch (error) {
    console.error("Error fetching bookings from MongoDB:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch bookings" });
  }
}

// GET /api/bookings/:id - Single booking details
export async function getBookingById(req, res) {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking record not found" });
    }

    return res.json({ success: true, data: booking });
  } catch (error) {
    console.error("Error fetching booking:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch booking" });
  }
}

// PATCH /api/bookings/:id/status - Update booking status
export async function updateBookingStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "confirmed", "completed", "cancelled"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value. Allowed: pending, confirmed, completed, cancelled",
      });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    return res.json({
      success: true,
      message: `Booking marked as ${status}`,
      data: updatedBooking,
    });
  } catch (error) {
    console.error("Error updating booking status:", error);
    return res.status(500).json({ success: false, message: "Failed to update booking status" });
  }
}

// DELETE /api/bookings/:id - Delete booking
export async function deleteBooking(req, res) {
  try {
    const { id } = req.params;
    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    return res.json({
      success: true,
      message: "Booking record deleted from MongoDB",
      data: deletedBooking,
    });
  } catch (error) {
    console.error("Error deleting booking:", error);
    return res.status(500).json({ success: false, message: "Failed to delete booking" });
  }
}
