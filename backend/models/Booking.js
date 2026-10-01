import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    bookingType: {
      type: String,
      enum: ["safari", "city-tour", "general"],
      default: "general",
      required: true,
    },
    tourTitle: {
      type: String,
      required: [true, "Tour title is required"],
      trim: true,
    },
    customerName: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },
    customerEmail: {
      type: String,
      required: [true, "Customer email is required"],
      trim: true,
      lowercase: true,
    },
    customerPhone: {
      type: String,
      required: [true, "Customer phone number is required"],
      trim: true,
    },
    tourDate: {
      type: String,
      required: [true, "Tour date is required"],
      trim: true,
    },
    guests: {
      type: Number,
      default: 1,
      min: 1,
    },
    pickupLocation: {
      type: String,
      trim: true,
      default: "",
    },
    specialNotes: {
      type: String,
      trim: true,
      default: "",
    },
    totalAmount: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      default: "AED",
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        return ret;
      },
    },
  }
);

bookingSchema.index({ customerEmail: 1, bookingType: 1, status: 1 });

const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
export default Booking;
