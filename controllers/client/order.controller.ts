import { Request, Response } from "express";
import Order from "../../models/order.model";
import { or } from "sequelize";
import { generateOrderCode } from "../../helpers/generate";

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

  // code dùng để show ra thông tin đơn hàng

  res.status(200).json({
    code: 200,
    message: "Đặt hàng thành công!",
    orderCode: code,
  });
};
