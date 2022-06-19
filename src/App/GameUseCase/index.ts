import {inject, injectable} from "inversify";
import {IIDService} from "../Interfaces/IDService/IIDService";
import {TYPES} from "../Interfaces/Types";
import {DataTypes} from "../../Data/Interfaces/Types/DataTypes";
import {IGameRepository} from "../../Data/Interfaces/Repositories/IGameRepository";
import {UtilsTypes} from "../../Utils/Interfaces/Types/UtilsTypes";
import {ILoggerService} from "../../Utils/Interfaces/LoggeService/ILoggerService";
import {BaseAppResult} from "../Model/Result/BaseAppResult";
import {ResultStatus} from "../Model/Result/ResultStatus";
import {Game} from "../../Data/Entities/Game";

@injectable()
export class GameUseCase {
    @inject(TYPES.IIDService) private _idService: IIDService;
    @inject(DataTypes.IGameRepository) private _gameRepository: IGameRepository;
    @inject(UtilsTypes.ILoggerService) private _loggerService: ILoggerService;

    /**
     * create Game usecase
     * @param packageName
     * @param creator
     * @param name
     */
    async createGame(packageName: string, creator: string, name: string): Promise<BaseAppResult<{ id: string } | null>> {
        try {
            const game = await this._gameRepository.findByPackageName(packageName);
            if (!game.isError) {
                return new BaseAppResult<{ id: string } | null>(
                    null,
                    true,
                    "game Already Exists.",
                    ResultStatus.Duplicate
                )
            }

            const gameEntity = new Game(
                this._idService.generate(),
                name,
                packageName,
                [creator],
                creator,
                new Date(),
                new Date(),
            );

            const createdGame = await this._gameRepository.create(gameEntity);
            if (createdGame.isError) {
                return new BaseAppResult<{ id: string } | null>(
                    null,
                    true,
                    "error on create game.",
                    ResultStatus.Unknown
                );
            }

            return new BaseAppResult<{ id: string } | null>(
                {
                    id: createdGame.data._id
                },
                false,
                "game created.",
                ResultStatus.Success
            );
        } catch (e) {
            return new BaseAppResult<{ id: string } | null>(
                null,
                true,
                "error on create game.",
                ResultStatus.Unknown
            );
        }
    }


    /**
     * get Game by package name usecase
     * @param packageName
     */
    async getGameByPackageName(packageName: string): Promise<BaseAppResult<Game | null>> {
        try {
            const game = await this._gameRepository.findByPackageName(packageName);
            if (game.isError) {
                return new BaseAppResult<Game | null>(
                    null,
                    true,
                    "error on get game.",
                    ResultStatus.Unknown
                );
            }

            return new BaseAppResult<Game | null>(
                game.data,
                false,
                "game found.",
                ResultStatus.Success
            );
        } catch (e) {
            return new BaseAppResult<Game | null>(
                null,
                true,
                "error on get game.",
                ResultStatus.Unknown
            );
        }
    }

    /**
     * update game usecase
     * @param packageName
     * @param name
     * @param gameId
     */
    async updateGame(packageName: string, name: string, gameId: string): Promise<BaseAppResult<Game | null>> {
        try {
            const game = await this._gameRepository.findById(gameId);
            if (game.isError) {
                return new BaseAppResult<Game | null>(
                    null,
                    true,
                    "error on get game.",
                    ResultStatus.Unknown
                );
            }


            const gameEntity = new Game(
                game.data._id,
                name,
                packageName,
                game.data.admins,
                game.data.creator,
                game.data.createdAt,
                new Date(),
            );

            const updatedGame = await this._gameRepository.update(gameEntity);
            if (updatedGame.isError) {
                return new BaseAppResult<Game | null>(
                    null,
                    true,
                    "error on update game.",
                    ResultStatus.Unknown
                );
            }

            return new BaseAppResult<Game | null>(
                updatedGame.data,
                false,
                "game updated.",
                ResultStatus.Success
            );
        } catch (e) {
            return new BaseAppResult<Game | null>(
                null,
                true,
                "error on update game.",
                ResultStatus.Unknown
            );

        }
    }

    /**
     * getAdminGames usecase
     * @param adminId
     */
    async getAdminGames(adminId: string): Promise<BaseAppResult<Game[] | null>> {
        try {
            const games = await this._gameRepository.getAdminGames(adminId);
            if (games.isError) {
                return new BaseAppResult<Game[] | null>(
                    null,
                    true,
                    "error on get games.",
                    ResultStatus.Unknown
                );
            }

            return new BaseAppResult<Game[] | null>(
                games.data,
                false,
                "games found.",
                ResultStatus.Success
            );
        } catch (e) {
            return new BaseAppResult<Game[] | null>(
                null,
                true,
                "error on get games.",
                ResultStatus.Unknown
            );
        }
    }
}