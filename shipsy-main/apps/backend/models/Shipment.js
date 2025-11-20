// models/Shipment.js
import mongoose from "mongoose";

// Embedded user schema for storing creator details
const createdBySchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true }, // original user _id
    username: { type: String, required: true },
}, { _id: false }); // don't create a new _id for the subdocument

const shipmentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    status: {
        type: String,
        enum: ["NEW", "IN-TRANSIT", "DELIVERED", "CANCELLED"],
        default: "NEW"
    },
    fragile: { type: Boolean, default: false },
    weightKg: { type: Number, required: true },
    distanceKm: { type: Number, required: true },
    baseRate: { type: Number, required: true },
    cost: { type: Number },

    // store full user details instead of just id
    createdBy: {
        type: createdBySchema,
        required: true
    },
}, { timestamps: true });

// Auto-calculate cost before saving
shipmentSchema.pre("save", function (next) {
    this.cost = this.weightKg * this.baseRate + this.distanceKm * 0.5;
    next();
});

export default mongoose.model("Shipment", shipmentSchema);
