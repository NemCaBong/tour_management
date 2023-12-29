import { Router } from "express";
import * as controller from "../../controllers/admin/tour.controller";
import multer from "multer";
import * as uploadCloud from "../../middlewares/admin/uploadCloud.middleware";
const router: Router = Router();

const upload: multer = multer();

// [GET] /admin/tours
router.get("/", controller.index);

// [GET] /admin/tours/create
router.get("/create", controller.create);

// [POST] /admin/tours/create
router.post(
  "/create",
  // upload lên backend
  upload.fields([{ name: "images", maxCount: 10 }]),
  uploadCloud.uploadFields,
  controller.createPost
);

export const tourRoutes: Router = router;
