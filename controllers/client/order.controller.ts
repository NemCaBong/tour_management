import { Request, Response } from "express";
import Order from "../../models/order.model";
import Tour from "../../models/tour.model";
import { generateOrderCode } from "../../helpers/generate";
import OrderItem from "../../models/order-items.model";

// [POST] /order
export const index = async (req: Request, res: Response) => {
  const data = req.body;

  const orderData = {
    code: "",
    fullName: data.info.fullName,
    phone: data.info.phone,
    note: data.info.note,
    status: "initial",
  };

  // Lưu data bảng Order
  const order = await Order.create(orderData);
  // lấy ra orderId để làm code.
  const orderId = order.dataValues.id;
  const code = generateOrderCode(orderId);
  await Order.update(
    {
      code: code,
    },
    {
      where: {
        id: orderId,
      },
    }
  );
  // hết tạo code

  // Lưu data vào OrderItems
  for (const item of data.cart) {
    const dataForOrderItems = {
      orderId: orderId,
      tourId: item.tourId,
      quantity: item.quantity,
    };

    const tour = await Tour.findOne({
      where: {
        id: item.tourId,
        deleted: false,
        status: "active",
      },
    });

    dataForOrderItems["price"] = tour["price"];
    dataForOrderItems["discount"] = tour["discount"];
    dataForOrderItems["timeStart"] = tour["timeStart"];
    // tạo mới
    await OrderItem.create(dataForOrderItems);
  }

  res.status(200).json({
    code: 200,
    message: "Đặt hàng thành công!",
    orderCode: code,
  });
};

//  [GET] /order/success
export const success = async (req: Request, res: Response) => {
  const orderCode = req.query.orderCode;
  const orderInfo = await Order.findOne({
    where: {
      code: orderCode,
      deleted: false,
    },
    raw: true,
  });

  // Tìm ra tất cả các mặt hàng trong order đó
  const ordersItem = await OrderItem.findAll({
    where: {
      orderId: orderInfo["id"],
    },
    raw: true,
  });

  for (const item of ordersItem) {
    item["price_special"] = item["price"] * (1 - item["discount"] / 100);
    item["total"] = item["quantity"] * item["price_special"];

    const tourInfo = await Tour.findOne({
      where: {
        id: item["tourId"],
        deleted: false,
      },
      raw: true,
    });

    item["image"] = JSON.parse(tourInfo["images"])[0];
    item["slug"] = tourInfo["slug"];
  }

  orderInfo["total_price"] = ordersItem.reduce(
    (total, item) => total + item["total"],
    0
  );

  res.render("client/pages/order/success.pug", {
    pageTitle: "Đặt hàng thành công",
    order: orderInfo,
    ordersItem: ordersItem,
  });
};
