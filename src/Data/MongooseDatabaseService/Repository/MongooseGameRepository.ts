import {IGameRepository} from "../../Interfaces/Repositories/IGameRepository";
import {Game} from "../../Entities/Game";
import {BaseDataResult} from "../../Model/Result/BaseDataResult";
import {BaseDataError} from "../../Errors/BaseDataError";
import MongooseGameModel from "../Model/MongooseGameModel";
import {injectable} from "inversify";

@injectable()
export class MongooseGameRepository implements IGameRepository {
    async create(game: Game): Promise<BaseDataResult<Game | null>> {
        try {
            let gameI = new MongooseGameModel(game);
            if (gameI.validateSync()) {
                return new BaseDataResult<Game | null>(null, true);
            }
            let result = await gameI.save();
            if (!result) {
                return new BaseDataResult<Game | null>(null, true);
            }

            return new BaseDataResult<Game | null>(result.toObject(), false);
        } catch (e) {
            throw new BaseDataError(e.message, e);
        }
    }

    async findByPackageName(packageName: string): Promise<BaseDataResult<Game | null>> {
        try {
            let result = await MongooseGameModel.findOne({packageName: packageName});
            if (!result) {
                return new BaseDataResult<Game | null>(null, true);
            }

            return new BaseDataResult<Game | null>(result.toObject(), false);
        } catch (e) {
            throw new BaseDataError(e.message, e);
        }
    }

    async getAdminGames(adminId: string): Promise<BaseDataResult<Game[] | null>> {
        try {
            let result = await MongooseGameModel.find({adminId: adminId});
            if (!result) {
                return new BaseDataResult<Game[] | null>(null, true);
            }
            return new BaseDataResult<Game[] | null>(result.map(x => x.toObject()), false);
        } catch (e) {
            throw new BaseDataError(e.message, e);
        }
    }

    async update(game: Game): Promise<BaseDataResult<Game | null>> {
        try {
            let gameI = new MongooseGameModel(game);
            if (gameI.validateSync()) {
                return new BaseDataResult<Game | null>(null, true);
            }
            let result = await MongooseGameModel.findOneAndUpdate({_id: game._id}, gameI.toObject());
            if (!result) {
                return new BaseDataResult<Game | null>(null, true);
            }

            return new BaseDataResult<Game | null>(result.toObject(), false);
        }catch (e) {
            throw new BaseDataError(e.message, e);
        }
    }

    async findById(id: string): Promise<BaseDataResult<Game | null>> {
        try {
            let result = await MongooseGameModel.findOne({_id: id});
            if (!result) {
                return new BaseDataResult<Game | null>(null, true);
            }

            return new BaseDataResult<Game | null>(result.toObject(), false);
        } catch (e) {
            throw new BaseDataError(e.message, e);
        }
    }



}