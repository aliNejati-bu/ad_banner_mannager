import {NextFunction, Request, Response} from "express";
import {container} from "../Container";
import {Auth} from "../App/Auth";
import {baseResponse} from "../helpers/functions";
import {ResultStatus} from "../App/Model/Result/ResultStatus";
import {GameUseCase} from "../App/GameUseCase";

let _auth = container.get<Auth>(Auth);

export async function verifyAdminToken(req: Request, res: Response, next: NextFunction) {
    // get token from header
    let token = req.headers['authorization'];

    // check if token exists
    if (!token) {
        return baseResponse(res, null, "Token is not provided", undefined, ResultStatus.NotAuthorized, 401);
    }

    token = (token as string).replace('Bearer ', '');

    let result = await _auth.verifyAdminToken(token);

    if (result.isError) {
        return baseResponse(res, null, "Token is not valid", undefined, result.ResultStatus, 401);
    }

    // attach user to request
    req.body.user = result.result;
    (req as any).user = result.result;
    next();
}

export async function isAccessToGame(req: Request, res: Response, next: NextFunction) {
    let gameUsecase = container.get<GameUseCase>(GameUseCase);
    let result = await gameUsecase.getGameById(req.body.gameId ?? req.body.id ?? req.params.gameId);
    if (result.isError) {
        return baseResponse(res, null, "Game not found", undefined, ResultStatus.NotFound, 404);
    }
    if (result.result.admins.indexOf(req.body.user._id) === -1) {
        return baseResponse(res, null, "You are not admin of this game", undefined, ResultStatus.NotAuthorized, 401);
    }
    req.body.game = result.result;
    next();
}