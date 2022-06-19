// adPlace Model:

// adPlace Schema
import mongoose from "mongoose";
import {AdPlace} from "../../Entities/AdPlace";

const adPlaceSchema = new mongoose.Schema<AdPlace>({
        _id: {
            type: String,
            required: true,
            index: true
        },
        createdAt: {
            type: Date,
            required: true
        },
        updatedAt: {
            type: Date,
            required: true

        },
        name: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true,
            enum: ["active", "inactive", "hybrid"]
        },
        banner: {
            type: String,
            required: true

        },
        gameId: {
            type: String,
            required: true
        }
    }
);

// export model
export default mongoose.model<AdPlace>("AdPlace", adPlaceSchema);