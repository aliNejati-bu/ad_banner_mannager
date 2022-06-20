import {inject, injectable} from "inversify";
import {TYPES} from "../Interfaces/Types";
import {IIDService} from "../Interfaces/IDService/IIDService";
import {DataTypes} from "../../Data/Interfaces/Types/DataTypes";
import {IBannerRepository} from "../../Data/Interfaces/Repositories/IBannerRepository";
import {BaseAppResult} from "../Model/Result/BaseAppResult";
import {ResultStatus} from "../Model/Result/ResultStatus";
import {UtilsTypes} from "../../Utils/Interfaces/Types/UtilsTypes";
import {ILoggerService} from "../../Utils/Interfaces/LoggeService/ILoggerService";
import * as BannerEntity from "../../Data/Entities/Banner";

@injectable()
export class Banner {
    @inject(TYPES.IIDService) private _idService: IIDService;
    @inject(DataTypes.IBannerRepository) _bannerRepository: IBannerRepository;
    @inject(UtilsTypes.ILoggerService) private _logger: ILoggerService;


    public async create(name: string, image: string, url: string, creator: string): Promise<BaseAppResult<{ id: string } | null>> {
        try {
            // search for banner with same name
            const banner = await this._bannerRepository.findByName(name);
            if (!banner.isError) {
                return new BaseAppResult<{ id: string } | null>(null, true, "banner already exists.", ResultStatus.Duplicate);
            }

            const newBanner = new BannerEntity.Banner(
                this._idService.generate(),
                name,
                image,
                url,
                new Date(),
                new Date(),
                creator
            );


            // create new banner
            const result = await this._bannerRepository.create(newBanner);
            if (result.isError) {
                return new BaseAppResult<{ id: string } | null>(null, true, "error creating banner.", ResultStatus.Unknown);
            }

            return new BaseAppResult<{ id: string } | null>({id: newBanner._id}, false, "banner created successfully.", ResultStatus.Success);
        } catch (error) {
            this._logger.error(error);
            return new BaseAppResult<{ id: string } | null>(null, true, error.message, ResultStatus.Unknown);
        }
    }


    public async findByName(name: string): Promise<BaseAppResult<BannerEntity.Banner | null>> {
        try {
            // search for banner with same name
            const banner = await this._bannerRepository.findByName(name);
            if (banner.isError) {
                return new BaseAppResult<BannerEntity.Banner | null>(null, true, "banner not found.", ResultStatus.NotFound);
            }

            return new BaseAppResult<BannerEntity.Banner | null>(banner.data, false, "banner found successfully.", ResultStatus.Success);
        } catch (e) {
            this._logger.error(e);
            return new BaseAppResult<BannerEntity.Banner | null>(null, true, e.message, ResultStatus.Unknown);
        }
    }


    /**
     * update a banner
     * @param banner
     * @param name
     * @param image
     * @param url
     *
     */
    public async update(banner: BannerEntity.Banner, name: string, image: string, url: string): Promise<BaseAppResult<BannerEntity.Banner | null>> {
        try {
            // search for banner with same name
            const bannerToUpdate = await this._bannerRepository.findByName(name);
            if (bannerToUpdate.isError) {
                return new BaseAppResult<BannerEntity.Banner | null>(null, true, "banner not found.", ResultStatus.NotFound);
            }

            // update banner
            bannerToUpdate.data.name = name;
            bannerToUpdate.data.image = image;
            bannerToUpdate.data.url = url;
            bannerToUpdate.data.updatedAt = new Date();
            const result = await this._bannerRepository.update(bannerToUpdate.data);
            if (result.isError) {
                return new BaseAppResult<BannerEntity.Banner | null>(null, true, "error updating banner.", ResultStatus.Unknown);
            }

            return new BaseAppResult<BannerEntity.Banner | null>(bannerToUpdate.data, false, "banner updated successfully.", ResultStatus.Success);
        } catch (error) {
            this._logger.error(error);
            return new BaseAppResult<BannerEntity.Banner | null>(null, true, error.message, ResultStatus.Unknown);
        }
    }

    /**
     * Find all banners userId
     * @param userId
     * @returns {Promise<BaseAppResult<BannerEntity.Banner[]>>}
     */
    public async findAllByUserId(userId: string): Promise<BaseAppResult<BannerEntity.Banner[]>> {
        try {
            // search for banners with same userId
            const banners = await this._bannerRepository.findAllByUserId(userId);
            if (banners.isError) {
                return new BaseAppResult<BannerEntity.Banner[]>(null, true, "banners not found.", ResultStatus.NotFound);
            }

            return new BaseAppResult<BannerEntity.Banner[]>(banners.data, false, "banners found successfully.", ResultStatus.Success);
        } catch (error) {
            this._logger.error(error);
            return new BaseAppResult<BannerEntity.Banner[]>(null, true, error.message, ResultStatus.Unknown);
        }

    }
}