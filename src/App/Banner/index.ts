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


    public async create(name: string, image: string, url: string): Promise<BaseAppResult<{ id: string } | null>> {
        try {
            // search for banner with same name
            const banner = await this._bannerRepository.findByName(name);
            if (banner.isError) {
                return new BaseAppResult<{id: string} | null>(null,true, "banner already exists.",ResultStatus.Duplicate);
            }

            const newBanner = new BannerEntity.Banner(
                this._idService.generate(),
                name,
                image,
                url,
                new Date(),
                new Date()
            );


            // create new banner
            const result = await this._bannerRepository.create(newBanner);
            if (result.isError) {
                return new BaseAppResult<{id: string} | null>(null,true, "error creating banner.",ResultStatus.Unknown);
            }

            return new BaseAppResult<{id: string} | null>({id: newBanner._id},false, "banner created successfully.",ResultStatus.Success);
        } catch (error) {
            this._logger.error(error);
            return new BaseAppResult<{ id: string } | null>(null, true,error.message,ResultStatus.Unknown);
        }
    }

}