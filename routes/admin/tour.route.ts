import { Router } from "express";
import * as controller from "../../controllers/admin/tour.controller";

const router: Router = Router();

// [GET] /admin/tours
router.get("/", controller.index);

export const tourRoutes: Router = router;
