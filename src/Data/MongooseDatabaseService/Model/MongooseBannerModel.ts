import * as mongoose from 'mongoose';
import {Banner} from "../../Entities/Banner";

const bannerSchema = new mongoose.Schema<Banner>({
    _id: {
        type: String,
        required: true,
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
        required: true,
        unique: true,
        index: true
    },
    image: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    creator: {
        type: String,
        required: true
    }
});


export default mongoose.model<Banner>("Banner", bannerSchema);