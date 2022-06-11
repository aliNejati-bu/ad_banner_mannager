import {Controller} from "..";
import {NextFunction, Request, Response} from "express";
import {baseResponse} from "../../helpers/functions";
import {inject, injectable} from "inversify";
import {UserValidator} from "../../Middleware/Validators/UserValidator";
import {wrapValidatorToMiddleware} from "../../Middleware/general";
import {container} from "../../Container";


class ExampleController extends Controller {


    testMethod(req: Request, res: Response, next?: NextFunction) {
        return baseResponse(res, (new UserValidator()).createUser({}), "validation test", undefined, "ok", 200);
    }
}

export default function (): ExampleController {
    const controller = new ExampleController();

    // add method to actions
    controller.addAction("/test", "get", controller.testMethod, [
        wrapValidatorToMiddleware(container.get(UserValidator).createUser)
    ])
    ;

    return controller;
}