import {IUploaderService} from "../../../Interfaces/UploaderService/IUploaderService";
import * as multer from "multer";
import {injectable} from "inversify";


@injectable()
export class MulterUploaderService implements IUploaderService {


    private basicMulter: multer.Multer;

    constructor() {
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'uploads/');
            },
            filename: (req, file, cb) => {
                cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
            }
        });
        this.basicMulter = multer({
            storage: storage, limits: {fileSize: 1024 * 1024 * 6}, fileFilter: (req, file, cb) => {
                if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
                    cb(null, true);
                } else {
                    cb(new Error("invalid mimetype: " + file.mimetype) as any, false);
                }
            }
        });
    }

    uploadMiddlewareWithGeneralSetting(filedName: string) {
        return this.basicMulter.single(filedName);
    }


}