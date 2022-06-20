import {IUserRepository} from "./Repositories/IUserRepository";
import {IBannerRepository} from "./Repositories/IBannerRepository";
import {IGameRepository} from "./Repositories/IGameRepository";
import {IAdPlaceRepository} from "./Repositories/IAdPlaceRepository";
import {IImpressionRepository} from "./Repositories/IImpressionRepository";

export interface IDatabaseService {
    connect(): Promise<void>;


    // repositories:
    userRepository: IUserRepository;
    bannerRepository: IBannerRepository;
    gameRepository: IGameRepository;
    adPlaceRepository: IAdPlaceRepository;
    impressionRepository: IImpressionRepository;
}