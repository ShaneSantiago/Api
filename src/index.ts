import app from "./app"
import createUser from './endpoints/createUser'
import getUserById from "./endpoints/getUserById"
import getUserByProfile from "./endpoints/getUserByProfile"
import getProduct from "./endpoints/getProduct"
import loginUser from './endpoints/loginUser'
import postProduct from "./endpoints/postProduct"
import allProduct from "./endpoints/allProduct"

app.post('/signup', createUser)
app.post('/login', loginUser)
app.get('/user/profile', getUserByProfile)
app.get('/user/:id', getUserById)


app.post('/product', postProduct)
app.get('/product/:id', getProduct)
app.get('/product', allProduct)