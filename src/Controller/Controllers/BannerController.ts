import {Controller} from "../index";
import {Request, Response} from "express";
import {container} from "../../Container";
import {BannerValidator} from "../../Middleware/Validators/BannerValidator";
import {wrapValidatorToMiddleware} from "../../Middleware/general";
import {TYPES} from "../../App/Interfaces/Types";
import {IUploaderService} from "../../App/Interfaces/UploaderService/IUploaderService";
import {Banner} from "../../App/Banner";

export class BannerController extends Controller {
    constructor(
        private _banner: Banner
    ) {
        super("/banner");
    }

    public async CreateBanner(req: Request, res: Response, next: Function) {
        console.log(req.files)
        res.send("CreateBanner");
    }
}

export default function (): BannerController {
    const bannerValidator = container.get<BannerValidator>(BannerValidator);
    const uploaderService = container.get<IUploaderService>(TYPES.IUploadService);
    const banner = new BannerController(container.get(Banner));
    banner.addAction("/", "post", banner.CreateBanner, [
        wrapValidatorToMiddleware(bannerValidator.createBanner),
        uploaderService.uploadMiddlewareWithGeneralSetting("image")
    ]);
    return banner;
}