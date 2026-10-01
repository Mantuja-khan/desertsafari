import Contact from "../models/Contact.js";

function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
}

// POST /api/contact - Submit Contact Form
export async function submitContact(req, res) {
  try {
    const { name, email, phone = "", tourType = "General Inquiry", message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Full Name, Email Address, and Message are required",
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    const newContact = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      tourType: tourType.trim(),
      message: message.trim(),
      status: "new",
    });

    return res.status(201).json({
      success: true,
      message: "Your message has been sent successfully! Our team will get back to you shortly.",
      data: newContact,
    });
  } catch (error) {
    console.error("Error saving contact in MongoDB:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to submit contact message",
    });
  }
}

// GET /api/contact - List all contact messages (Admin)
export async function getAllContacts(req, res) {
  try {
    const { status, search } = req.query;
    const query = {};

    if (status && status !== "all") {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { message: { $regex: search, $options: "i" } },
      ];
    }

    const messages = await Contact.find(query).sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.error("Error fetching contact messages from MongoDB:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch contact inquiries" });
  }
}

// PATCH /api/contact/:id/status - Update message status
export async function updateContactStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["new", "read", "replied"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value. Allowed: new, read, replied",
      });
    }

    const updated = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }

    return res.json({
      success: true,
      message: `Message status updated to ${status}`,
      data: updated,
    });
  } catch (error) {
    console.error("Error updating contact status:", error);
    return res.status(500).json({ success: false, message: "Failed to update status" });
  }
}

// DELETE /api/contact/:id - Delete message
export async function deleteContact(req, res) {
  try {
    const { id } = req.params;
    const deleted = await Contact.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }

    return res.json({
      success: true,
      message: "Contact message deleted from MongoDB",
      data: deleted,
    });
  } catch (error) {
    console.error("Error deleting contact:", error);
    return res.status(500).json({ success: false, message: "Failed to delete message" });
  }
}
