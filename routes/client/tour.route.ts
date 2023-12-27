import { Router } from "express";
import * as controller from "../../controllers/client/tour.controller";

const router: Router = Router();

// [GET] /tours/:slugCategory
router.get("/:slugCategory", controller.index);

router.get("/detail/:slugTour", controller.detail);

export const tourRoutes: Router = router;
