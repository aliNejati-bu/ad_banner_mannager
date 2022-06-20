import * as express from "express"
import router from "./Router";
import * as bodyParser from "body-parser";
import * as multer from "multer";

const app = express();

export const run = async (PORT: number, HOST: string) => {


    app.use(express.json());



    app.use(bodyParser.urlencoded({ extended: true }));



    router.init(app);

    app.listen(PORT, HOST, () => {
        console.log(`Server running on http://${HOST}:${PORT}`);
    });
}