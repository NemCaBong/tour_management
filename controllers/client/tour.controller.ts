import { Request, Response } from "express";
import Tour from "../../models/tour.model";
import sequelize from "../../config/database";
import { QueryTypes } from "sequelize";
import { tourRoutes } from "../../routes/client/tour.route";

// [GET] /tours/:slugCategory
export const index = async (req: Request, res: Response) => {
  const slug = req.params.slugCategory;
  const tours = await sequelize.query(
    `
    SELECT tours.*, ROUND(price * (1 - discount/100), 0) AS price_special
    FROM tours
    JOIN tours_categories ON tours.id = tours_categories.tour_id
    JOIN categories ON tours_categories.category_id = categories.id
    WHERE
      categories.slug = '${slug}'
      AND categories.deleted = false
      AND categories.status = 'active'
      AND tours.deleted = false
      AND tours.status = 'active';
  `,
    { type: QueryTypes.SELECT }
  );

  tours.forEach((item) => {
    if (item["images"]) {
      item["images"] = JSON.parse(item["images"]);
      item["image"] = item["images"][0];
    }
    // chuyển thành Int để có thể .toLocaleString()
    item["price_special"] = parseInt(item["price_special"]);
  });

  res.render("client/pages/tours/index", {
    pageTitle: "Danh sách tour",
    tours: tours,
  });
};

// [GET] /tours/detail/:slugTour
export const detail = async (req: Request, res: Response) => {
  const slugTour = req.params.slugTour;
  /* 
    SELECT *
    FROM tours
    WHERE slug = ':slugTour'
      AND deleted = false
      AND status = 'active';
  */

  const tourDetail = await Tour.findOne({
    where: {
      deleted: false,
      status: "active",
      slug: slugTour,
    },
    raw: true,
  });

  // Đổi ảnh sang JSON
  tourDetail["images"] = JSON.parse(tourDetail["images"]);

  // Lấy giá mới
  tourDetail["price_special"] =
    tourDetail["price"] * (1 - tourDetail["discount"] / 100);

  console.log(tourDetail);
  res.render("client/pages/tours/detail", {
    pageTitle: "Chi tiết tour",
    tourDetail: tourDetail,
  });
};
