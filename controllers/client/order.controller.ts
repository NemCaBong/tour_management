import { Request, Response } from "express";

// [POST] /order
export const index = async (req: Request, res: Response) => {
  const data = req.body;
  console.log(data);

  res.status(200).json({
    code: 200,
    message: "Đặt hàng thành công!",
  });
};
