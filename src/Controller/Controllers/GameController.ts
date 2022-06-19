import {injectable} from "inversify";
import {Controller} from "../index";
import {GameUseCase} from "../../App/GameUseCase";
import {baseResponse} from "../../helpers/functions";
import {ResultStatus} from "../../App/Model/Result/ResultStatus";
import {container} from "../../Container";
import {GameValidator} from "../../Middleware/Validators/GameValidator";
import {wrapValidatorToMiddleware} from "../../Middleware/general";
import {verifyAdminToken} from "../../Middleware/userMiddlewares";

@injectable()
export class GameController extends Controller {

    constructor(
        private _game: GameUseCase
    ) {
        super("/game");
    }

    // create new game
    async createGame(req, res, next) {
        let result = await this._game.createGame(req.body.packagename, req.body.user._id, req.body.name);

        if (result.isError) {
            return baseResponse(res, null, result.message, undefined, result.ResultStatus, result.ResultStatus == ResultStatus.Duplicate ? 409 : 500);
        }

        return baseResponse(res, result.result, "game successful created.", undefined, ResultStatus.Success, 200);
    }


    // edit game
    async editGame(req, res, next) {
        let result = await this._game.updateGame(req.body.packagename, req.body.name, req.body.gameId);

        if (result.isError) {
            return baseResponse(res, null, result.message, undefined, result.ResultStatus, result.ResultStatus == ResultStatus.Duplicate ? 409 : 500);
        }

        return baseResponse(res, result.result, null, undefined, ResultStatus.Success, 200);
    }

    // get all games of an admin
    async getAllGames(req, res, next) {
        let result = await this._game.getAdminGames(req.body.user._id);

        if (result.isError) {
            return baseResponse(res, null, result.message, undefined, result.ResultStatus, 403);
        }

        return baseResponse(res, result.result, null, undefined, ResultStatus.Success, 200);
    }
}


export default function (): GameController {
    const validator = container.get<GameValidator>(GameValidator);
    const controller = new GameController(
        container.get(GameUseCase)
    );

    controller.addAction("/", "post", controller.createGame,
        [
            wrapValidatorToMiddleware(validator.createGame),
            verifyAdminToken
        ]);
    controller.addAction("/", "put", controller.editGame,
        [
            wrapValidatorToMiddleware(validator.updateGame),
            verifyAdminToken
        ]);
    controller.addAction("/", "get", controller.getAllGames,
        [
            verifyAdminToken
        ]);


    return controller;
}