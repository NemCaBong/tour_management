import { Request, Response } from "express";
import Tour from "../../models/tour.model";

// [GET] /cart
export const index = async (req: Request, res: Response) => {
  res.render("client/pages/cart/index", {
    pageTitle: "Trang giỏ hàng",
  });
};

// [POST] /cart/list-cart-data
export const listCartData = async (req: Request, res: Response) => {
  const tours = req.body;

  for (const tour of tours) {
    const infoTour = await Tour.findOne({
      where: {
        id: tour.tourId,
        deleted: false,
        status: "active",
      },
      raw: true,
    });

    tour["info"] = infoTour;
    // preview image
    tour["image"] = JSON.parse(infoTour["images"])[0];
    // special price
    tour["price_special"] =
      infoTour["price"] * (1 - infoTour["discount"] / 100);

    // tổng tiền 1 tour
    tour["total"] = tour["price_special"] * tour.quantity;
  }

  res.json({
    tours: tours,
  });
};
