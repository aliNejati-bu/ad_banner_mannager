import {IDatabaseService} from "../Interfaces/IDatabaseService";
import * as mongoose from "mongoose";
import {inject, injectable} from "inversify";
import {IUserRepository} from "../Interfaces/Repositories/IUserRepository";
import {DataTypes} from "../Interfaces/Types/DataTypes";
import {IBannerRepository} from "../Interfaces/Repositories/IBannerRepository";
import {IGameRepository} from "../Interfaces/Repositories/IGameRepository";

@injectable()
export class MongooseDatabaseService implements IDatabaseService {
    public async connect(): Promise<void> {
        // connect to mongoose
        await mongoose.connect(process.env.MONGO_URI ?? "mongodb://localhost:27017/avattech", {});
    }

    @inject(DataTypes.IUserRepository) userRepository: IUserRepository;
    @inject(DataTypes.IBannerRepository) bannerRepository: IBannerRepository;
    @inject(DataTypes.IGameRepository) gameRepository: IGameRepository;
}