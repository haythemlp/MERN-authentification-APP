import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export const checkAccessToken = (req: Request, res: Response, next: NextFunction) => {
  //Get the jwt token from the head
  const token = <string>req.headers["x-auth-token"];

  if (!token) {
    return res
      .status(401)
      .json({ message: " Unauthorized" });
  }
  let jwtPayload;

  //Try to validate the token and get data
  try {
    jwtPayload = <any>jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY || 'accessTokenSecretKey');
    req.body.userId = jwtPayload.userId;

  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    res.status(401).send();
    return;
  }

  //Call the next middleware or controller
  next();
};