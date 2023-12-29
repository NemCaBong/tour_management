import { Request, Response } from "express";

// [GET] /admin/upload/
/**
 * Handle file mà người dùng gửi qua tinymce
 * @param req
 * @param res
 */
export const index = async (req: Request, res: Response) => {
  res.json({
    // trả về location với giá trị chính là
    // link của file đó
    location: req.body.file,
  });
};
