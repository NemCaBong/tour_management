import { Router } from "express";
import * as controller from "../../controllers/admin/category.controller";

const router: Router = Router();

// [GET] /admin/categories
router.get("/", controller.index);

export const categoryRoutes: Router = router;
