import productModel from "../features/products/models/product-model.js";
import catchAsync from "../utils/catchAsync.js";
import { logger } from "../utils/logger.js";
const checkDuplicate = catchAsync( async (req, res, next) => {
  const { name } = req.body;

  const existingProduct = await productModel.findOne({ name });

  if (existingProduct) {
    return res.status(400).json({
      success: false,
      message: "Product already exists",
    });
  }

  next();
})
export default checkDuplicate;