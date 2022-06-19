import {IUserRepository} from "./Repositories/IUserRepository";
import {IBannerRepository} from "./Repositories/IBannerRepository";
import {IGameRepository} from "./Repositories/IGameRepository";

export interface IDatabaseService {
    connect(): Promise<void>;


    // repositories:
    userRepository: IUserRepository;
    bannerRepository: IBannerRepository;
    gameRepository: IGameRepository;
}