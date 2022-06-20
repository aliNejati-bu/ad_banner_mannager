import {BaseDataResult} from "../../Model/Result/BaseDataResult";
import {Impression} from "../../Entities/Impression";
import {Click} from "../../Entities/Click";

export interface IClickRepository {

    /**
     * Create a click
     * @param {Click} click
     *
     */
    createClick(click:Click): Promise<BaseDataResult<Impression | null>>;

    /**
     * get clicks count by banner id default all country
     * @param {string} bannerId
     * @param countryCode
     */
    getClickCountByBannerId(bannerId: string, countryCode?: string): Promise<BaseDataResult<number | null>>;

    /**
     * get clicks count by adPlace id default all country
     * @param {string} adPlaceId
     * @param countryCode
     */
    getClickCountByAdPlaceId(adPlaceId: string, countryCode?: string): Promise<BaseDataResult<number | null>>;

}