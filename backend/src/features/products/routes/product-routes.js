import express from 'express';
const router = express.Router();
import addProduct from '../controllers/add-controller.js'
import uploadMdw from '../../../middlewares/multer-middleware.js';
import requireLogin from '../../../middlewares/requireLogin-middleware.js';
import requireSeller from '../../../middlewares/requireSeller-middleware.js';
import {featuredProducts,sellerProducts,deleteProduct, updateProduct} from '../controllers/Products-controller.js'


router.post('/seller/add',requireLogin,requireSeller,uploadMdw,addProduct);
router.get('/featured',featuredProducts);
router.get('/seller/products',requireLogin,requireSeller,sellerProducts)
router.delete('/seller/delete',requireLogin,requireSeller,deleteProduct)
router.patch('/seller/update',requireLogin,requireSeller,uploadMdw,updateProduct)
export default router;