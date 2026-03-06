import mongoose from "mongoose";
import userModel from "../../auth/models/user-model.js";
import categories from "../../../constants/categories-constant.js";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true,unique:true },

    slug: { type: String, index: true },

    description: { type: String, required: true },

    price: { type: Number, required: true, min: 0 },

    discount: { type: Number, default: 0, min: 0, max: 90 },

    finalPrice: { type: Number },

    stockQty: { type: Number, required: true, min: 0 },

    category: { type: String, required: true, 
      enum: Object.values(categories),
    },

    subCategory: { type: String },  

    brandName: { type: String },

    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },

    imageList: { type: [String], default: [] },

    features: [String],

    tags: [String],

    isActive: { type: Boolean, default: false },

    avgRating: { type: Number, default: 0 },

    reviewCount: { type: Number, default: 0 },

    soldCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);

productSchema.pre('save',function(){
  if(this.isModified("name")){
    this.slug=this.name
     .toLowerCase()
     .trim()
     .replace(/\s+/g,'-')
     .replace(/[^\w\-]+/g,'')
     .replace(/\-\-+/g,"-");
  }
})
const productModel = new  mongoose.model("product", productSchema);
export default productModel;
