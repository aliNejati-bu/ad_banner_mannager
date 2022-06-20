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

    /**
     * Find all banners userId
     * @param userId
     */
    async findAllByUserId(userId: string): Promise<BaseDataResult<Banner[] | null>> {
        try {
            let result = await MongooseBannerModel.find({userId});
            if (!result) {
                return new BaseDataResult<Banner[] | null>(null, true);
            }
            return new BaseDataResult<Banner[] | null>(result.map(item => item.toObject()), false);
        } catch (e) {
            throw new BaseDataError("Error while finding banners", e);
        }
    }

    /**
     * update a banner
     * @param banner
     */
    async update(banner: Banner): Promise<BaseDataResult<Banner | null>> {
        try {
            let result = await MongooseBannerModel.findOneAndUpdate({_id: banner._id}, banner);
            if (!result) {
                return new BaseDataResult<Banner | null>(null, true);
            }
            return new BaseDataResult<Banner | null>(result.toObject(), false);
        } catch (e) {
            throw new BaseDataError("Error while updating banner", e);
        }
    }

    /**
     * find banner by Id
     * @param bannerId
     */
    async findById(bannerId: string): Promise<BaseDataResult<Banner | null>> {
        try {
            let result = await MongooseBannerModel.findOne({_id: bannerId});
            if (!result) {
                return new BaseDataResult<Banner | null>(null, true);
            }
            return new BaseDataResult<Banner | null>(result.toObject(), false);
        } catch (e) {
            throw new BaseDataError("Error while finding banner", e);
        }
    }

}