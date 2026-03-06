import path from "path";
import fs from 'fs';
import AppError from "../../../utils/appError.js";
import catchAsync from "../../../utils/catchAsync.js";
import productModel from "../models/product-model.js";

  export const featuredProducts = catchAsync(async (req,res,next)=>{
    const products= await productModel.find({});
    res.status(200).json({message:'sucess',products:products});
})

export  const sellerProducts = catchAsync(async (req,res,next)=>{
  const user = req.user;
  const sellerProducts = await productModel.find({sellerId  :user._id});
 res.status(200).json({
      status: true,
      message: sellerProducts.length>0? "Seller Products.":"No products posted yet",
      sellerProducts: sellerProducts
    });
})

export const deleteProduct = catchAsync(async(req,res,next)=>{
  const productId = req.query.id;
  const product = await productModel.findById(productId);
  if(!product.sellerId.equals(req.user._id))
  {
    throw new AppError(400,'Something went wrong');
  }
 const deletedProduct= await productModel.findByIdAndDelete(product._id);
 if(!deletedProduct)
 {
  throw new AppError(500,'Something went wrong');
 }
  product.imageList.forEach((imgPath) => {
    fs.unlink(path.join(process.cwd(),imgPath),(err)=>{
      if(err)
      {
        throw new AppError(500,'Something Went Wrong while');
      }
    });
  });
  res.status(200).json({status:'success',message:'Product Deleted SuccesFully'});
})



export const updateProduct = catchAsync(async (req, res) => {
  console.log(req)
  const user = req.user;
  const {
    name,
    description,
    price,
    discount,
    stockQty,
    category,
    brandName,
    features,
    tags,
    isActive,
  } = req.body;

  // Only build image list if files are uploaded
  let imageList = [];
  if (req.files && req.files.length > 0) {
    imageList = req.files.map(file => {
      const filename = path.basename(file.path);
      return path.join("/uploads", filename);
    });
  }

  // Build update object dynamically
  const updatedFields = {};

  if (name) updatedFields.name = name;
  if (description) updatedFields.description = description;
  if (price) {
    updatedFields.price = price;
    updatedFields.discount = discount || 0;
    updatedFields.finalPrice = price - (price * (updatedFields.discount / 100));
  }
  if (stockQty) updatedFields.stockQty = stockQty;
  if (category) updatedFields.category = category;
  if (brandName) updatedFields.brandName = brandName;
  if (imageList.length > 0) updatedFields.imageList = imageList;
  if (features) updatedFields.features = features.split(",").map(s => s.trim());
  if (tags) updatedFields.tags = tags.split(",").map(s => s.trim());
  if (typeof isActive !== "undefined") updatedFields.isActive = isActive;

  // Always keep sellerId consistent
  updatedFields.sellerId = user._id;

  // Update product in DB
  const product = await productModel.findByIdAndUpdate(
    req.query.id,
    { $set: updatedFields },
    { new: true, runValidators: true }
  );

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json({
    message: "Product updated successfully",
    product,
  });
});
