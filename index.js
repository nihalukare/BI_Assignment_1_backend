const express = require("express");
const app = express();
const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

const { initializeDatabase } = require("./db/db.connect");
const Events = require("./models/events.model");

// middleware
app.use(express.json());

initializeDatabase();

// function to get the events data.
async function getAllEventsData() {
  try {
    const eventsData = await Events.find();
    return eventsData;
  } catch (error) {
    console.log(error);
  }
}
// route to get all eventsData
app.get("/events", async (req, res) => {
  try {
    const eventsData = await getAllEventsData();
    if (eventsData) {
      res
        .status(200)
        .json({ message: "Events found successfully.", events: eventsData });
    } else {
      res.status(404).json({ error: "No events data found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data." });
  }
});

// function to get event by Id
async function getEventById(eventId) {
  try {
    const eventData = await Events.findById(eventId);
    return eventData;
  } catch (error) {
    console.log(error);
  }
}
// route to get event by Id
app.get("/events/:eventId", async (req, res) => {
  try {
    const eventData = await getEventById(req.params.eventId);
    if (eventData) {
      res.status(200).json(eventData);
    } else {
      res.status(404).json({ error: "No event data found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data." });
  }
});

// function to create new Event data.
async function createEvent(data) {
  try {
    const newEvent = new Events(data);
    const savedEvent = await newEvent.save();
    return savedEvent;
  } catch (error) {
    console.log(error);
  }
}
// route to create new Event data.
app.post("/events", async (req, res) => {
  try {
    const savedEvent = await createEvent(req.body);
    if (savedEvent) {
      res
        .status(200)
        .json({ message: "Event created successfully.", event: savedEvent });
    } else {
      res.status(400).json({ error: "Failed to create new event." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data." });
  }
});

require("dotenv").config();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
