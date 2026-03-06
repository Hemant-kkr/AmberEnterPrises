import express from 'express';
const router = express.Router();
import authRoutes from '../features/auth/routes/auth-routes.js'
import productRoutes from '../features/products/routes/product-routes.js'
router.use('/auth',authRoutes);
router.use('/product',productRoutes)

export default router