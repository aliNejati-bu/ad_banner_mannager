import {BaseDataResult} from "../../Model/Result/BaseDataResult";
import {Impression} from "../../Entities/Impression";

export interface IImpressionRepository {

    /**
     * creteImpression
     * @param {Impression} impression
     *
     */
    createImpression(impression: Impression): Promise<BaseDataResult<Impression | null>>;

    /**
     * get impression count by banner id default all country
     * @param {string} bannerId
     * @param countryCode
     */
    getImpressionCountByBannerId(bannerId: string,countryCode?:string): Promise<BaseDataResult<number | null>>;

    /**
     * get impression count by adPlace id default all country
     * @param {string} adPlaceId
     * @param countryCode
     */
    getImpressionCountByAdPlaceId(adPlaceId: string,countryCode?:string): Promise<BaseDataResult<number | null>>;

}