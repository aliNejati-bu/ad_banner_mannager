import {Controller} from "../index";
import {Request, Response} from "express";
import {container} from "../../Container";
import {BannerValidator} from "../../Middleware/Validators/BannerValidator";
import {wrapValidatorToMiddleware} from "../../Middleware/general";
import {TYPES} from "../../App/Interfaces/Types";
import {IUploaderService} from "../../App/Interfaces/UploaderService/IUploaderService";
import {Banner} from "../../App/Banner";
import {verifyAdminToken} from "../../Middleware/userMiddlewares";
import {baseResponse} from "../../helpers/functions";

export class BannerController extends Controller {
    constructor(
        private _banner: Banner
    ) {
        super("/banner");
    }

    public async CreateBanner(req: Request, res: Response, next: Function) {
        const result = await this._banner.create(req.body.name, req.file.path, req.body.url, (req as any).user._id);
        if (result.isError) {
            return baseResponse(res, null, result.message, undefined, result.ResultStatus, result.ResultStatus ? 400 : 500);
        }
        return baseResponse(res, result.result, "banner created.", undefined, result.ResultStatus, result.ResultStatus ? 200 : 500);
    }

}

export default function (): BannerController {
    const bannerValidator = container.get<BannerValidator>(BannerValidator);
    const uploaderService = container.get<IUploaderService>(TYPES.IUploadService);
    const banner = new BannerController(container.get(Banner));
    banner.addAction("/", "post", banner.CreateBanner, [
        verifyAdminToken,
        uploaderService.uploadMiddlewareWithGeneralSetting("image"),
        wrapValidatorToMiddleware(bannerValidator.createBanner)
    ]);
    return banner;
}