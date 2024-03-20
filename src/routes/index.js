import express from "express";
import routerProduct from "./products.js";
import routerAuth from "./auth.js";
import routerCategories from "./categories.js";
const router = express.Router();

router.use('/products', routerProduct)
router.use('/categories', routerCategories)
router.use('/auth', routerAuth)
export default router;