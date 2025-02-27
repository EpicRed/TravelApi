import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    location: { type: String },
    country: { type: String, required: true },
    city: { type: String, required: true },
    price: { type: Number, required: true },
    averageRating: { type: Number, default: 0 },
    image: { type: String },
    createdBy : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    updatedBy : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      default: null
    },
  },
  {
    timestamp: true,
  }
);

const Tour = mongoose.model("Tour", tourSchema);
export default Tour;
