import * as mongoose from 'mongoose';
import {Click} from "../../Entities/Click";


const bannerSchema = new mongoose.Schema<Click>({
    _id: {
        type: String,
        required: true,
        unique: true,
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
    adPlace: {
        type: String,
        required: true,

    },
    game: {
        type: String,
        required: true
    },
    banner: {
        type: String,
        required: true

    },
    countryCode: {
        type: String,
        required: true
    }
});


export default mongoose.model<Click>("Click", bannerSchema);