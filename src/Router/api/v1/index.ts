import {Router} from "express";
import ExampleController from "../../../Controller/Controllers/ExampleController";
import AuthController from "../../../Controller/Controllers/AuthController";
import BannerController from "../../../Controller/Controllers/BannerController";


const router = Router();

router.use(ExampleController().setupActions());
router.use(AuthController().setupActions())
router.use(BannerController().setupActions())

export default router;