import {IAdPlaceRepository} from "../../Interfaces/Repositories/IAdPlaceRepository";
import {injectable} from "inversify";
import {AdPlace} from "../../Entities/AdPlace";
import {BaseDataResult} from "../../Model/Result/BaseDataResult";
import {BaseDataError} from "../../Errors/BaseDataError";
import MongooseAdPlaceModel from "../Model/MongooseAdPlaceModel";

@injectable()
export class MongooseAdPlaceRepository implements IAdPlaceRepository {
    async create(adPlace: AdPlace): Promise<BaseDataResult<AdPlace | null>> {
        try {
            let result = new MongooseAdPlaceModel(adPlace);
            await result.save();
            if (!result) {
                return new BaseDataResult<AdPlace | null>(null, true);
            }
            return new BaseDataResult<AdPlace | null>(result.toObject(), false);
        } catch (e) {
            throw new BaseDataError(e.message, e);
        }
    }

    /**
     * get all AdPlaces of the Game
     * @param gameId
     */
    async getAll(gameId: string): Promise<BaseDataResult<AdPlace[]>> {
        try {
            let result = await MongooseAdPlaceModel.find({gameId: gameId});
            if (!result) {
                return new BaseDataResult<AdPlace[]>([], true);
            }
            return new BaseDataResult<AdPlace[]>(result.map(x => x.toObject()), false);
        } catch (e) {
            throw new BaseDataError(e.message, e);
        }
    }

    /**
     * get AdPlace by id
     * @param id
     */
    async getById(id: string): Promise<BaseDataResult<AdPlace | null>> {
        try {
            let result = await MongooseAdPlaceModel.findById(id);
            if (!result) {
                return new BaseDataResult<AdPlace | null>(null, true);
            }
            return new BaseDataResult<AdPlace | null>(result.toObject(), false);
        } catch (e) {
            throw new BaseDataError(e.message, e);
        }
    }

    /**
     * update AdPlace
     * @param adPlace
     */
    async update(adPlace: AdPlace): Promise<BaseDataResult<AdPlace | null>> {
        try {
            let result = await MongooseAdPlaceModel.findByIdAndUpdate(adPlace._id, adPlace);
            if (!result) {
                return new BaseDataResult<AdPlace | null>(null, true);
            }
            return new BaseDataResult<AdPlace | null>(result.toObject(), false);
        } catch (e) {
            throw new BaseDataError(e.message, e);
        }
    }

}