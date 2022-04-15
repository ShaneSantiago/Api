import { Request, Response } from "express";
import connection from "../connection";
import { getTokenData } from "../services/authenticator";
import { authenticationData } from "../types";

const getUserByProfile = async (req: Request, res: Response) => {
  try {
    const access_token: string = req.headers.authorization!;
    const tokenData: authenticationData | null = getTokenData(access_token);
    
    if (!tokenData) {
      res.statusCode = 401;
      throw new Error("Não autorizado");
    }
    const result: any = await connection("users_teste").where({
      id: tokenData?.id
    });
    res
      .status(201)
      .send({ id: result[0].id, name: result[0].name });
  } catch (error: any) {
    if (res.statusCode === 200) {
      res.status(500).send({ message: error.message });
    } else {
      res.status(res.statusCode).send({ message: error.message });
    }
  }
};
export default getUserByProfile;
