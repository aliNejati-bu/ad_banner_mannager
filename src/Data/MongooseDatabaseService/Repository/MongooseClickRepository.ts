import {Impression} from "../../Entities/Impression";
import {BaseDataResult} from "../../Model/Result/BaseDataResult";
import {BaseDataError} from "../../Errors/BaseDataError";
import {IClickRepository} from "../../Interfaces/Repositories/IClickRepository";
import {Click} from "../../Entities/Click";
import MongooseClickModel from "../Model/MongooseClickModel";

export class MongooseClickRepository implements IClickRepository {

    /**
     * @param click
     */
    async createClick(click: Click): Promise<BaseDataResult<Impression | null>> {
        try {
            const result = new MongooseClickModel(click);
            await result.save();
            if (!result) {
                return new BaseDataResult<Impression | null>(null, false)
            }

            return new BaseDataResult<Impression | null>(result.toObject(), true);
        } catch (e) {
            throw new BaseDataError(e.message, e)
        }
    }


    async getClickCountByAdPlaceId(adPlaceId: string, countryCode: string = "*"): Promise<BaseDataResult<number | null>> {
        try {
            if (countryCode === "*") {
                const result = await MongooseClickModel.countDocuments({adPlace: adPlaceId});
                return new BaseDataResult<number | null>(result, true);
            }
            const result = await MongooseClickModel.countDocuments({
                adPlace: adPlaceId,
                countryCode: countryCode
            });
            return new BaseDataResult<number | null>(result, true);
        } catch (e) {
            throw new BaseDataError(e.message, e)
        }
    }

    /**
     * get click count by banner id default all country
     * @param {string} bannerId
     * @param countryCode
     */
    async getClickCountByBannerId(bannerId: string, countryCode?: string): Promise<BaseDataResult<number | null>> {
        try {
            if (countryCode === "*") {
                const result = await MongooseClickModel.countDocuments({banner: bannerId});
                return new BaseDataResult<number | null>(result, true);
            }
            const result = await MongooseClickModel.countDocuments({
                banner: bannerId,
                countryCode: countryCode
            });
            return new BaseDataResult<number | null>(result, true);
        } catch (e) {
            throw new BaseDataError(e.message, e)
        }

    }


}