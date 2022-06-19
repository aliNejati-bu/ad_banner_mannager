import {injectable} from "inversify";
import {BaseValidatorAppResult} from "../../App/Model/Result/Validator/BaseValidatorAppResult";
import * as joi from "joi";
import {BaseValidator} from "./BaseValidator";

@injectable()
export class GameValidator extends BaseValidator {
    createGame<T>(input): BaseValidatorAppResult<T | null> {
        let schema = joi.object().keys({
            name: joi.string().required().max(255),
            packagename: joi.string().required().max(255)
        });
        return this.createResult<T>(schema, input);
    }
}