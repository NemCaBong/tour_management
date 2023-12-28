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
