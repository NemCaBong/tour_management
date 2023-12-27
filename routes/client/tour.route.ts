import { Router } from "express";
import * as controller from "../../controllers/client/tour.controller";

const router: Router = Router();

// [GET] /tours/:slugCategory
router.get("/:slugCategory", controller.index);

export const tourRoutes: Router = router;
