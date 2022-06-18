import {inject, injectable} from "inversify";
import {TYPES} from "../Interfaces/Types";
import {IIDService} from "../Interfaces/IDService/IIDService";

@injectable()
export class Banner {
    @inject(TYPES.IIDService) private _idService: IIDService;

}