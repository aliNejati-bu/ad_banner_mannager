import {IUserRepository} from "./Repositories/IUserRepository";
import {IBannerRepository} from "./Repositories/IBannerRepository";

export interface IDatabaseService {
    connect(): Promise<void>;


    // repositories:
    userRepository: IUserRepository;
    bannerRepository: IBannerRepository;
}