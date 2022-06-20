import {IImpressionRepository} from "../../Interfaces/Repositories/IImpressionRepository";
import {Impression} from "../../Entities/Impression";
import {BaseDataResult} from "../../Model/Result/BaseDataResult";
import {BaseDataError} from "../../Errors/BaseDataError";
import MongooseIImpressionModel from "../Model/MongooseIImpressionModel";

export class MongooseImpressionRepository implements IImpressionRepository {

    /**
     * @param impression
     */
    async createImpression(impression: Impression): Promise<BaseDataResult<Impression | null>> {
        try {
            const result = new MongooseIImpressionModel(impression);
            await result.save();
            if (!result) {
                return new BaseDataResult<Impression | null>(null, false)
            }

            return new BaseDataResult<Impression | null>(result.toObject(), true);
        } catch (e) {
            throw new BaseDataError(e.message, e)
        }
    }

    /**
     * get impressions by adPlace id default all country
     * @param adPlaceId
     * @param countryCode
     */
    async getImpressionCountByAdPlaceId(adPlaceId: string, countryCode: string = "*"): Promise<BaseDataResult<number | null>> {
        try {
            if (countryCode === "*") {
                const result = await MongooseIImpressionModel.countDocuments({adPlace: adPlaceId});
                return new BaseDataResult<number | null>(result, true);
            }
            const result = await MongooseIImpressionModel.countDocuments({
                adPlace: adPlaceId,
                countryCode: countryCode
            });
            return new BaseDataResult<number | null>(result, true);
        } catch (e) {
            throw new BaseDataError(e.message, e)
        }
    }

    /**
     * get impression count by banner id default all country
     * @param {string} bannerId
     * @param countryCode
     */
    async getImpressionCountByBannerId(bannerId: string, countryCode?: string): Promise<BaseDataResult<number | null>> {
        try {
            if (countryCode === "*") {
                const result = await MongooseIImpressionModel.countDocuments({banner: bannerId});
                return new BaseDataResult<number | null>(result, true);
            }
            const result = await MongooseIImpressionModel.countDocuments({
                banner: bannerId,
                countryCode: countryCode
            });
            return new BaseDataResult<number | null>(result, true);
        } catch (e) {
            throw new BaseDataError(e.message, e)
        }

    }


}