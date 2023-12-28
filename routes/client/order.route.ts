import { Router } from "express";
import * as controller from "../../controllers/client/order.controller";

const router: Router = Router();

// [POST] /order
router.post("/", controller.index);

export const orderRoutes: Router = router;
