import type { Response } from "express";

type Tresponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;
  error?: any;
}

type user = {
  id: string;
  name: string;
  email: string;
  age: number;
  role: string;
}

const sendResponse = <T>(res: Response, data: Tresponse<T>) => {
 
    res.status(data.statusCode).json({
      success: data.success ,
      message: data.message ,
      data: data.data || null,
      error: data.error ,
    });

}


export default sendResponse;