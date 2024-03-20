import express from "express";
import { getUser, signIn, signUp } from "../controllers/auth.js";

const routerAuth = express.Router();

routerAuth.post('/signup', signUp);
routerAuth.post('/signin', signIn);
routerAuth.get('/', getUser);

export default routerAuth;