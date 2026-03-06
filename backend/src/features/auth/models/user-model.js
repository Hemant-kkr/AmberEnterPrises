import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import roles from "../../../constants/roles-constant.js";

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
      enum: Object.values(roles),
      default: roles.BUYER,
    },
    roleRequest: {
      requestedRole: {
        type: String,
        enum: [roles.SELLER, roles.TRANSPORTER],
      },

      status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
      },

      requestedAt: Date,
      reviewedAt: Date,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    phone: {
  type: String,   
  unique: true,
  trim: true
},
    address:{
      country:{
      type:String,
      },
      city:{
        type:String,
      },
      pincode:{
        type:Number
      }
    }
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (){
   if (!this.isModified("password")) return;
   
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    
})
const userModel = new mongoose.model("user", userSchema);
export default userModel;