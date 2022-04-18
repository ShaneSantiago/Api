import { Request, Response } from "express"
import connection from "../connection";
import { generateToken } from "../services/authenticator";
import generateId from "../services/idGenerator"
import { user, userRole } from "../types";
import { hash } from "../services/hashManager";

export default async function createUser(
   req: Request,
   res: Response
): Promise<void> {
   try {

      const { name, password, role } = req.body

      if (!name || !password || !role) {
         
         throw new Error("Preencha os campos 'name', 'password' e 'role'")
      }

      if (password.length < 6){
         
         throw new Error("A senha deve conter, no mínimo, 6 dígitos");
      }

      if (role.toUpperCase() !== userRole.ADMIN && role.toUpperCase() !== userRole.NORMAL){
         
         throw new Error("Os valores possíveis para 'role' são NORMAL e ADMIN");
      }

      const [user] = await connection('users_teste')
         .where({ name })

      if (user) {
      
         throw new Error('Usuário já cadastrado')
      }

      const id: string = generateId();

      const cypherText = await hash(password);

      const newUser: user = { id, name, password: cypherText, role }

      await connection('users_teste')
         .insert(newUser)

      const access_token: string = generateToken({ id, role })

      res.status(201).send({ access_token })

   } catch (error: any) {

      if (res.statusCode === 200) {
         res.status(500).send(error.message)
      } else {
         res.send({ message: error.message })
      }
   }
}