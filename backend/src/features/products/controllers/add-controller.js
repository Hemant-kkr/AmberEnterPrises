import path from "path";
import AppError from "../../../utils/appError.js";
import catchAsync from "../../../utils/catchAsync.js";
import { mailSender } from "../../../utils/mailSender.js";
import productModel from "../models/product-model.js";
const addProduct = catchAsync(async (req, res, next) => {
    const user = req.user;
    const productDetails = req.body;
    const {name,description,price,discount,stockQty,category,brandName,features,tags,isActive} = productDetails;
    const imageList = req.files.map(file => {
      const filename = path.basename(file.path);
     const filePath  = path.join('/uploads',filename);
     return filePath
    });
    
  const product = {
    name: name,
    description: description,
    price: price,
    discount: discount || 0,
    finalPrice: price-(price*(discount/100)),
    stockQty: stockQty,
    category: category,
    brandName: brandName,
    sellerId: user._id,
    imageList:imageList,
    features: features?.split(",").map(s => s.trim()),
    tags: tags?.split(",").map(s => s.trim()),
    isActive: isActive,
    avgRating: 0,
    reviewCount: 0,
    soldCount: 0,
  };
  const newProduct = new productModel(product);
  const addNewProduct = await newProduct.save();
  if(!addNewProduct) throw new AppError("something went wronge",500);
  await mailSender({
    to: user.email,
    subject: "Product Added Successfully — Amber Enterprises",
    text: `Hello ${user.userName}, your product "${addNewProduct.name}" was added successfully.`,
    html: `<h2>Product Added</h2><p>${addNewProduct.name} added successfully.</p>`
  }); 
res.status(201).json({ product:addNewProduct,message:'Product added Sucessfully' });

});
export default addProduct;
