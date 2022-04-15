import { Request, Response } from "express";
import connection from "../connection";
import { getTokenData } from "../services/authenticator";
import { authenticationData } from "../types";

const getProduct = async (req: Request, res: Response) => {
  try {

    
    const id = req.params.id
    
    const access_token: string = req.headers.authorization!;
    const tokenData: authenticationData | null = getTokenData(access_token);

    if (!tokenData) {
      res.statusCode = 401;
      throw new Error("Não autorizado");
    }
    const result: any = await connection("product_teste").where({
      id,
    });
    res
      .status(201)
      .send({ 
          id: result[0].id, 
          name: result[0].name,
          price: result[0].price, 
          description: result[0].description,
          quantity: result[0].quantity,
          user_id: result[0].user_id, 
          createdAt: result[0].date.toLocaleString().slice(0, 10)
        });
        
  } catch (error: any) {
    if (res.statusCode === 200) {
      res.status(500).send({ message: error.message });
    } else {
      res.status(res.statusCode).send({ message: error.message });
    }
  }
};
export default getProduct;
