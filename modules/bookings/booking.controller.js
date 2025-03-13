import Booking from "./booking.model.js";
import Tour from "../tours/tour.model.js";

export const createBooking = async (req, res) => {
  try {
    const tourId = req.params.tourId;
    const { guests, date, user } = req.body;

    console.log(guests, "guests");
    console.log(date, "date");
    console.log(user, "user");

    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }
    const booking = new Booking({
      user,
      tour: tourId,
      guests,
      date,
    });

    await booking.save();
    res.status(201).json({ message: "Booking cereated successfully", booking });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const getBookings = async (req, res) => {
  try {
    const userId = req.params.userId;
    const bookings = await Booking.find({ user: userId }).populate(
      "tour",
      "title location price"
    );
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    booking.status = "cancelled"
    await booking.save();
    res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
    }
}

// Detyr shtepije
// GetMyBooking
// cancalBooking
