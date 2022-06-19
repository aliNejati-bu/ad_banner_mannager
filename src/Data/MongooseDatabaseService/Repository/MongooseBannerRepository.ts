import {IBannerRepository} from "../../Interfaces/Repositories/IBannerRepository";
import {Banner} from "../../Entities/Banner";
import {BaseDataResult} from "../../Model/Result/BaseDataResult";
import {BaseDataError} from "../../Errors/BaseDataError";
import MongooseBannerModel from "../Model/MongooseBannerModel";
import {injectable} from "inversify";

@injectable()
export class MongooseBannerRepository implements IBannerRepository {
    async create(banner: Banner): Promise<BaseDataResult<Banner | null>> {
        try {
            let result = new MongooseBannerModel(banner);
            result = await result.save();
            return result.toObject();
        } catch (e) {
            throw new BaseDataError("Error while creating banner", e);
        }
    }

    async findByName(name: string): Promise<BaseDataResult<Banner | null>> {
        try {
            let result = await MongooseBannerModel.findOne({name});
            if (!result) {
                return new BaseDataResult<Banner | null>(null, true);
            }
            return result.toObject();
        } catch (e) {
            throw new BaseDataError("Error while finding banner", e);
        }
    }

}