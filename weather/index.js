import { Router } from "express";

import { homePage} from "./controller.js"

const router = Router();

router.get('/',homePage);


export { router };