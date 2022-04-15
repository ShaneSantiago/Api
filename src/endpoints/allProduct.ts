import { Request, Response } from "express";
import connection from "../connection";
import { getTokenData } from "../services/authenticator";
import { authenticationData, product } from "../types";

// const allProduct = async (req: Request, res: Response) => {
//   try {

//     const {id, name, price, description, quantity, user_id} = req.body
    
//     const access_token: string = req.headers.authorization!;
//     const tokenData: authenticationData | null = getTokenData(access_token);

//     if (!tokenData) {
//       res.statusCode = 401;
//       throw new Error("Não autorizado");
//     }
//     const result: any = await connection("product_teste").where({
//       id,
//       name,
//       price,
//       description,
//       quantity,
//       user_id
//     });
//     res
//       .status(201)
//       .send({ 
//           id: result[0].id, 
//           name: result[0].name,
//           price: result[0].price, 
//           description: result[0].description,
//           quantity: result[0].quantity,
//           user_id: result[0].user_id, 
//           createdAt: result[0].date.toLocaleString().slice(0, 10)
//         });
        
//   } catch (error: any) {
//     if (res.statusCode === 200) {
//       res.status(500).send({ message: error.message });
//     } else {
//       res.status(res.statusCode).send({ message: error.message });
//     }
//   }
// };
// export default allProduct;


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