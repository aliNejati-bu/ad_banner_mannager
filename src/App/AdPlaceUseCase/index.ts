import {inject, injectable} from "inversify";
import {DataTypes} from "../../Data/Interfaces/Types/DataTypes";
import {IAdPlaceRepository} from "../../Data/Interfaces/Repositories/IAdPlaceRepository";
import {TYPES} from "../Interfaces/Types";
import {IIDService} from "../Interfaces/IDService/IIDService";
import {UtilsTypes} from "../../Utils/Interfaces/Types/UtilsTypes";
import {ILoggerService} from "../../Utils/Interfaces/LoggeService/ILoggerService";
import {BaseAppResult} from "../Model/Result/BaseAppResult";
import {ResultStatus} from "../Model/Result/ResultStatus";
import {AdPlace} from "../../Data/Entities/AdPlace";
import {IBannerRepository} from "../../Data/Interfaces/Repositories/IBannerRepository";

@injectable()
export class AdPlaceUseCase {
    // inject the repository
    @inject(DataTypes.IAdPlaceRepository) private _adPlaceRepository: IAdPlaceRepository;
    @inject(DataTypes.IBannerRepository) private _bannerRepository: IBannerRepository;

    // inject the services
    @inject(TYPES.IIDService) private _idService: IIDService;

    // inject the utilities
    @inject(UtilsTypes.ILoggerService) private _loggerService: ILoggerService;

    /**
     * Create a new AdPlace
     * @param {string} name
     * @param {"active" | "inactive" | "hybrid"} status
     * @param {string | null} banner
     * @param {string} gameId
     * @returns {Promise<BaseAppResult<{id:string}|null>>}
     * @memberof AdPlaceUseCase
     * @example
     * // create a new AdPlace
     * const result = await adPlaceUseCase.createAdPlace("AdPlaceName", "active", "banner", "gameId");
     */
    public async createAdPlace(name: string, status: "active" | "inactive" | "hybrid", banner: string | null, gameId: string): Promise<BaseAppResult<{ id: string } | null>> {
        try {

            // check if the banner exists
            if (banner) {
                const result = await this._bannerRepository.findById(banner);
                if (result.isError) {
                    return new BaseAppResult<{ id: string } | null>(null, true, "Error getting Banner", ResultStatus.NotFound);
                }
            }


            // create a new AdPlace
            const adPlace = new AdPlace(
                this._idService.generate(),
                name,
                status,
                banner,
                new Date(),
                new Date(),
                gameId
            );
            // save the AdPlace
            const result = await this._adPlaceRepository.create(adPlace);
            if (!result) {
                return new BaseAppResult<{ id: string } | null>(null, true, "Error creating AdPlace", ResultStatus.Unknown);
            }
            return new BaseAppResult<{ id: string } | null>({id: result.data._id}, false, "adPlace Created", ResultStatus.Success);

        } catch (error) {
            this._loggerService.error(error);
            return new BaseAppResult<{ id: string } | null>(null, true, "Error creating AdPlace", ResultStatus.Unknown);
        }
    }

    /**
     * Get an AdPlace by id
     * @param {string} id
     * @returns {Promise<BaseAppResult<AdPlace|null>>}
     * @memberof AdPlaceUseCase
     *
     */
    public async getAdPlaceById(id: string): Promise<BaseAppResult<AdPlace | null>> {
        try {
            // get the AdPlace
            const result = await this._adPlaceRepository.getById(id);
            if (!result) {
                return new BaseAppResult<AdPlace | null>(null, true, "Error getting AdPlace", ResultStatus.NotFound);
            }
            return new BaseAppResult<AdPlace | null>(result.data, false, "AdPlace retrieved", ResultStatus.Success);

        } catch (error) {
            this._loggerService.error(error);
            return new BaseAppResult<AdPlace | null>(null, true, "Error getting AdPlace", ResultStatus.Unknown);
        }
    }

    /**
     * Get all AdPlaces By GameId
     * @param {string} gameId
     * @returns {Promise<BaseAppResult<AdPlace[]|null>>}
     *
     */
    public async getAdPlacesByGameId(gameId: string): Promise<BaseAppResult<AdPlace[] | null>> {
        try {
            // get the AdPlaces
            const result = await this._adPlaceRepository.getAll(gameId);
            if (!result) {
                return new BaseAppResult<AdPlace[] | null>(null, true, "Error getting AdPlaces", ResultStatus.NotFound);
            }
            return new BaseAppResult<AdPlace[] | null>(result.data, false, "AdPlaces retrieved", ResultStatus.Success);
        } catch (error) {
            this._loggerService.error(error);
            return new BaseAppResult<AdPlace[] | null>(null, true, "Error getting AdPlaces", ResultStatus.Unknown);
        }
    }

    /**
     * Update an AdPlace
     * @param {string} id
     * @param {string} name
     * @param {"active" | "inactive" | "hybrid"} status
     * @param {string | null} banner
     */
    public async updateAdPlace(id: string, name: string, status: "active" | "inactive" | "hybrid", banner: string | null): Promise<BaseAppResult<AdPlace | null>> {
        try {

            // check if the banner exists
            if (banner) {
                const result = await this._bannerRepository.findById(banner);
                if (result.isError) {
                    return new BaseAppResult<AdPlace | null>(null, true, "Error getting Banner", ResultStatus.NotFound);
                }
            }

            // get the AdPlace
            const result = await this._adPlaceRepository.getById(id);
            if (result.isError) {
                return new BaseAppResult<AdPlace | null>(null, true, "Error getting AdPlace", ResultStatus.NotFound);
            }
            // update the AdPlace
            result.data.name = name;
            result.data.status = status;
            result.data.banner = banner;
            result.data.updatedAt = new Date();
            // save the AdPlace
            const resultUpdate = await this._adPlaceRepository.update(result.data);
            if (resultUpdate.isError) {
                return new BaseAppResult<AdPlace | null>(null, true, "Error updating AdPlace", ResultStatus.Unknown);
            }
            return new BaseAppResult<AdPlace | null>(resultUpdate.data, false, "AdPlace updated", ResultStatus.Success);
        } catch (error) {
            this._loggerService.error(error);
            return new BaseAppResult<AdPlace | null>(null, true, "Error updating AdPlace", ResultStatus.Unknown);
        }
    }
}