import { Router } from "express";
import * as controller from "../../controllers/client/cart.controller";

const router: Router = Router();

// [GET] /cart
router.get("/", controller.index);

// [POST] /cart/list-json
router.post("/list-cart-data", controller.listCartData);

export const cartRoutes: Router = router;
