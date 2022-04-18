import { Request, Response } from "express";
import connection from "../connection";
import { getTokenData } from "../services/authenticator";
import { authenticationData, product } from "../types";


const allProduct = async (req: Request, res: Response) => {
    try{

        const access_token: string = req.headers.authorization!;
        const tokenData: authenticationData | null = getTokenData(access_token);

        if (!tokenData) {
            res.statusCode = 401;
            throw new Error("Não autorizado");
          }

        const id = req.query.id || "%"
        const name = req.query.name || "%"
        const price = req.query.price || "%"
        const quantity = req.query.quantity || "%"
        const description = req.query.description || "%"

        const product: product[] = await connection("product_teste")
        .where("name", "LIKE", `%${name}%`)
        .where("price", "LIKE", `%${price}%`)
        .where("quantity", "LIKE", `%${quantity}%`)
        .where("description", "LIKE", `%${description}%`)
        .where("id", "LIKE", `%${id}%`)
        res.send(product)
        
    }catch(error: any){
        res.status(500).send({message: error.message})
    }
}
export default allProduct