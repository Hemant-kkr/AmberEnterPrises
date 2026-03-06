import mongoose from 'mongoose';
import userModel from '../models/user-model.js';

export async function findUserByEmail(email) {
  return userModel.findOne({ email });
}
