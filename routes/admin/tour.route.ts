import { Router } from "express";
import * as controller from "../../controllers/admin/tour.controller";

const router: Router = Router();

// [GET] /admin/tours
router.get("/", controller.index);

// [GET] /admin/tours/create
router.get("/create", controller.create);

// [POST] /admin/tours/create
router.post("/create", controller.createPost);

export const tourRoutes: Router = router;
