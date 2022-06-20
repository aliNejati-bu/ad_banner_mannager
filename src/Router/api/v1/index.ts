import {Router} from "express";
import ExampleController from "../../../Controller/Controllers/ExampleController";
import AuthController from "../../../Controller/Controllers/AuthController";
import BannerController from "../../../Controller/Controllers/BannerController";
import GameController from "../../../Controller/Controllers/GameController";
import AdPlaceController from "../../../Controller/Controllers/AdPlaceController";


const router = Router();

router.use(ExampleController().setupActions());
router.use(GameController().setupActions());
router.use(AuthController().setupActions())
router.use(BannerController().setupActions())
router.use(AdPlaceController().setupActions())

export default router;