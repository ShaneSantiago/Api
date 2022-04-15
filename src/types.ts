
export type authenticationData = {
   id: string,
   role: string
}

export type user = {
   id: string,
   name: string,
   password: string,
   role: string
   
}

export type product = {
   id: string,
   user_id: string,
   name: string,
   price: string,
   description: string,
   quantity: string
}

export enum userRole{
   ADMIN = "ADMIN",
   NORMAL = "NORMAL"
}