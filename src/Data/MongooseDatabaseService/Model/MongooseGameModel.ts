import * as mongoose from 'mongoose';
import {Game} from "../../Entities/Game";

const gameSchema = new mongoose.Schema<Game>({
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
    },
    admins: {
        type: [String],
        required: true,
        index: true
    },
    creator: {
        type: String,
        required: true,
        index: true
    },
    packagename: {
        type: String,
        required: true,
        index: true,
        unique: true
    }

});


export default mongoose.model<Game>("Game", gameSchema);