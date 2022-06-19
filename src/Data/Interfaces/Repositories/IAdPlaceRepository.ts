import {BaseDataResult} from "../../Model/Result/BaseDataResult";
import {AdPlace} from "../../Entities/AdPlace";

export interface IAdPlaceRepository{
    /**
     * create a new AdPlace
     * @param {AdPlace} adPlace
     */
    create(adPlace:AdPlace): Promise<BaseDataResult<AdPlace|null>>;


    /**
     * get all AdPlaces of the Game
     * @param {string} gameId
     */
    getAll(gameId:string): Promise<BaseDataResult<AdPlace[]>>;

    /**
     * get AdPlace by id
     * @param {string} id
     */

    getById(id:string): Promise<BaseDataResult<AdPlace|null>>;

    /**
     * update AdPlace
     * @param {AdPlace} adPlace
     */
    update(adPlace:AdPlace): Promise<BaseDataResult<AdPlace|null>>;



}