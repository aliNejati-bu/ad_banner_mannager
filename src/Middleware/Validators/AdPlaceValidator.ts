import {BaseValidator} from "./BaseValidator";
import * as joi from 'joi';
import {BaseValidatorAppResult} from "../../App/Model/Result/Validator/BaseValidatorAppResult";

export class AdPlaceValidator extends BaseValidator {
    createAddPlace<T>(input): BaseValidatorAppResult<T | null> {
        let schema = joi.object().keys({
            name: joi.string().required().max(255),
            status: joi.string().required().valid('active', 'inactive', 'hybrid'),
            banner: joi.string().optional().max(255),
            gameId: joi.string().required().max(255)
        });
        return this.createResult<T>(schema, input);
    }

    updateAdPlace<T>(input): BaseValidatorAppResult<T | null> {
        let schema = joi.object().keys({
            name: joi.string().required().max(255),
            status: joi.string().required().valid('active', 'inactive', 'hybrid'),
            banner: joi.string().optional().max(255),
            gameId: joi.string().required().max(255),
            placeId: joi.string().required().max(255)
        });
        return this.createResult<T>(schema, input);
    }
}