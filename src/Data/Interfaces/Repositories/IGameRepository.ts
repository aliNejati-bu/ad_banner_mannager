import {BaseDataResult} from "../../Model/Result/BaseDataResult";
import {Game} from "../../Entities/Game";

/**
 * Interface for the GameRepository
 */
export interface IGameRepository {

    /**
     * Get a game by package name
     * @param packageName
     */
    findByPackageName(packageName: string): Promise<BaseDataResult<null | Game>>;

    /**
     * create a new game
     * @param game
     */
    create(game: Game): Promise<BaseDataResult<null | Game>>;

    /**
     * update a game
     * @param game
     */
    update(game: Game): Promise<BaseDataResult<null | Game>>;


    /**
     * get a admin games
     * @param adminId
     */
    getAdminGames(adminId: string): Promise<BaseDataResult<null | Game[]>>;

    /**
     * find game by id
     * @param id
     */
    findById(id: string): Promise<BaseDataResult<null | Game>>;
}