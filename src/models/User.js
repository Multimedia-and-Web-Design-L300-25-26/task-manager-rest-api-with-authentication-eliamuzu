import mongoose from "mongoose";


// Create User schema
// Fields:
// - name (String, required)
// - email (String, required, unique)
// - password (String, required, minlength 6)
// - createdAt (default Date.now)



const userSchema = new mongoose.Schema({
  name: {
    type: String,
    reequired: true
  }, 
  email: {
    type: String,
    reequired: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  createdAt: {
    default: Date().toString()
  }
});

const User = mongoose.model("User", userSchema);

export default User;