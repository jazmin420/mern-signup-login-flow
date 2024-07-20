const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the user schema
const userSchema = new Schema({
  coverPhoto : {
    type: String,
  },
  profilePicture : {
    type: String,
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    unique: true
  },
  educationLevel: {
    type: String,
    enum: [ "High School" , "Associate's Degree" , "Bachelor's Degree" , "Master's Degree", "Doctorate or Professional Degree"],
  },
  profileUrl : String,
  qrCodeGenerated: { type: Boolean, default: false },
  },
  {timestamps: true}
);


const User = mongoose.model('User', userSchema);

module.exports = User;
