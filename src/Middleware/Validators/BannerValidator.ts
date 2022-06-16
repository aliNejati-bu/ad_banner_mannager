import {BaseValidator} from "./BaseValidator";
import * as joi from 'joi';
import {BaseValidatorAppResult} from "../../App/Model/Result/Validator/BaseValidatorAppResult";

export class BannerValidator extends BaseValidator {
    createBanner<T>(input): BaseValidatorAppResult<T | null> {
        let schema = joi.object().keys({
            name: joi.string().required().max(255),
            url: joi.string().required().max(255)
        });
        return this.createResult<T>(schema, input);
    }
}