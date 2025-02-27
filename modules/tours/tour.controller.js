import Tour from "./tour.model.js";

export const createTour = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      country,
      city,
      price,
      averageRating,
      image,
      createdBy,
      updatedBy
    } = req.body;
    const tour = new Tour({
      title,
      description,
      location,
      country,
      city,
      price,
      averageRating,
      image,
      createdBy,
      updatedBy
    });
    await tour.save();
    res.status(201).json({ message: "Tour created", tour });
  } catch (error) {
    res.status(400).json({ message: "Error Creating Tour" });
    console.log(error);
  }
};

// Get all tours
export const getTours = async (req, res) => {
  try {
    const tours = await Tour.find().populate("createdBy","firstName lastName").populate("updatedBy","firstName lastName").sort({
      createdAt: -1,
    });
    res.status(200).json(tours);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "server error", error: error });
  }
};

// Get single tour
export const getTourById = async (req, res) => {
  try {
    const tourId = req.params.tourId;
    const tour = await Tour.findById(tourId).populate("createdBy","firstName lastName").populate("updatedBy","firstName lastName");
    res.status(200).json(tour);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error });
  }
};

// Update tour
export const updateTour = async (req, res) => {
  try {
    const tourId = req.params.tourId;

    const {  title,
      description,
      location,
      country,
      city,
      price,
      averageRating,
      image,
      createdBy,
      updatedBy } =
      req.body;

    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({ message: "User not found" });
    }
    if (title) {
      tour.title = title;
    }
    if (description) {
      tour.description = description;
    }
    if (location) {
      tour.location = location;
    }
    if (country) {
      tour.country = country;
    }
    if (city) {
      tour.city = city;
    }
    if (price) {
      tour.price = price;
    }
    if (averageRating) {
      tour.averageRating = averageRating;
    }
    if (image) {
      tour.image = image;
    }
    if (createdBy) {
      tour.createdBy = createdBy;
    }
    if (updatedBy) {
      tour.updatedBy = updatedBy;
    }
    

    await tour.save();
    res.status(200).json({ message: "Tour updated successfully", tour });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error });
  }
};
// Delete tour
export const deleteTour = async (req, res) => {
  try {
    const tourId = req.params.id;
    await Tour.findByIdAndDelete(tourId);
    res.status(200).json({ message: "Tour deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error });
  }
};
