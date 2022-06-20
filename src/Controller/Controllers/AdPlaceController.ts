import {Controller} from "../index";
import {NextFunction, Request, Response} from "express";
import {AdPlaceUseCase} from "../../App/AdPlaceUseCase";
import {baseResponse} from "../../helpers/functions";
import {ResultStatus} from "../../App/Model/Result/ResultStatus";
import {container} from "../../Container";
import {GameUseCase} from "../../App/GameUseCase";
import {AdPlaceValidator} from "../../Middleware/Validators/AdPlaceValidator";
import {wrapValidatorToMiddleware} from "../../Middleware/general";
import {isAccessToGame, verifyAdminToken} from "../../Middleware/userMiddlewares";

export class AdPlaceController extends Controller {
    constructor(
        private _adPlaceUseCase: AdPlaceUseCase
    ) {
        super("/adPlaces");
    }

    public async createPlace(req: Request, res: Response, next: NextFunction) {
        let result = await this._adPlaceUseCase.createAdPlace(
            req.body.name,
            req.body.status,
            req.body.banner ?? null,
            req.body.gameId
        );
        if (result.isError) {
            return baseResponse(res, null, result.message, undefined, result.ResultStatus, 500);
        }
        return baseResponse(res, result.result, result.message, undefined, result.ResultStatus, 200);
    }

    /**
     * update an AdPlace
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    public async updatePlace(req: Request, res: Response, next: NextFunction) {
        let r = await this._adPlaceUseCase.getAdPlaceById(req.body.placeId);
        if (r.isError) {
            return baseResponse(res, null, r.message, undefined, r.ResultStatus, r.ResultStatus === ResultStatus.NotFound ? 404 : 500);
        }
        if (r.result.gameId != req.body.gameId) {
            return baseResponse(res, null, "this adplace in not exist.", undefined, ResultStatus.NotFound, 404);
        }
        let result = await this._adPlaceUseCase.updateAdPlace(
            req.body.placeId,
            req.body.name,
            req.body.status,
            req.body.banner ?? null
        );
        if (result.isError) {
            return baseResponse(res, null, result.message, undefined, result.ResultStatus, result.ResultStatus === ResultStatus.NotFound ? 404 : 500);
        }
        return baseResponse(res, result.result, result.message, undefined, result.ResultStatus, 200);
    }

    /**
     * get all AdPlaces
     * @param req
     * @param res
     * @param next
     */
    public async getAllGameBannersWithOutPopulate(req: Request, res: Response, next: NextFunction) {
        let result = await this._adPlaceUseCase.getAdPlacesByGameId(req.params.gameId);
        if (result.isError) {
            return baseResponse(res, null, result.message, undefined, result.ResultStatus, result.ResultStatus === ResultStatus.NotFound ? 404 : 500);
        }
        return baseResponse(res, result.result, result.message, undefined, result.ResultStatus, 200);
    }
}

export default function (): AdPlaceController {
    const validator = container.get<AdPlaceValidator>(AdPlaceValidator);
    const controller = new AdPlaceController(
        container.get<AdPlaceUseCase>(AdPlaceUseCase)
    );

    controller.addAction("/", "post", controller.createPlace, [
        wrapValidatorToMiddleware(validator.createAddPlace),
        verifyAdminToken
    ])

    controller.addAction("/", "put", controller.updatePlace, [
        wrapValidatorToMiddleware(validator.updateAdPlace),
        verifyAdminToken,
        isAccessToGame
    ])


    controller.addAction("/:gameId", "get", controller.getAllGameBannersWithOutPopulate, [
            verifyAdminToken,
            isAccessToGame
        ]
    )


    return controller;

}