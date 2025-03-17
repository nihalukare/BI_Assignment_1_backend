const mongoose = require("mongoose");

const speakerSchema = new mongoose.Schema({
  speakerName: { type: String },
  designation: { type: String },
  photoUrl: { type: String },
});

const eventsScehma = new mongoose.Schema(
  {
    title: { type: String },
    imageUrl: { type: String },
    hostedBy: { type: String },
    startTime: { type: Date },
    endTime: { type: Date },
    startDate: { type: Date },
    endDate: { type: Date },
    location: { type: String },
    fees: { type: Number, default: 0 },
    speakers: { type: [speakerSchema], default: [] },
    details: { type: String },
    additionalInformation: {
      dressCode: { type: String },
      ageRestrictions: { type: String },
    },
    eventTags: { type: [String], default: [] },
    typeOfEvent: { type: String, enum: ["Online", "Offline", "Both"] },
  },
  { timestamps: true }
);

const Events = mongoose.model("Events", eventsScehma);
module.exports = Events;
