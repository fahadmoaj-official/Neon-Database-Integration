
import type { Request,Response,NextFunction } from "express";

const GlobalerrorHandler = (err:any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export default GlobalerrorHandler;