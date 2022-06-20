import * as mongoose from 'mongoose';
import {Impression} from "../../Entities/Impression";


const bannerSchema = new mongoose.Schema<Impression>({
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


export default mongoose.model<Impression>("Impression", bannerSchema);