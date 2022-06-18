import {Banner} from "../../Entities/Banner";
import {BaseDataResult} from "../../Model/Result/BaseDataResult";

/**
 * Interface for BannerRepository
 */
export interface IBannerRepository {

    /**
     * Create a new banner
     * @param banner
     */
    create(banner: Banner): Promise<BaseDataResult<null | Banner>>;

    /**
     * Find a banner by id
     * @param name
     */
    findByName(name: string): Promise<BaseDataResult<null | Banner>>;

}