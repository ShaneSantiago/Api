import { Request, Response } from "express";
import connection from "../connection";
import { getTokenData } from "../services/authenticator";
import generateId from "../services/idGenerator";
import { authenticationData, product } from "../types";

export default async function postProduct(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { name, price, description, quantity } = req.body;

    if (!name || !price || !description || !quantity ) {
      res.statusCode = 422;
      throw new Error("Preencha os campos name, price, description e quantity");
    }
    const id: string = generateId();

    const access_token: string = req.headers.authorization!;
    const tokenData: authenticationData | null = getTokenData(access_token);

    const product: product = { id, user_id: tokenData?.id!, name, price, description, quantity};
    await connection("product_teste").insert(product);
    res.status(201).send({ product });
  } catch (error: any) {
    if (res.statusCode === 200) {
      res.status(500).send(error.message);
    } else {
      res.send({ message: error.message });
    }
  }
}
