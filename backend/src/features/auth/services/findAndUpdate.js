import userModel from "../models/user-model.js";
import mongoose from "mongoose";
async function findAndUpdate(find,update) {
 return await userModel.findOneAndUpdate(
    find,
    update,
    { new: true },
  );
}
export default findAndUpdate