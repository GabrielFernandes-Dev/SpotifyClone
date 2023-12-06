import mongoose from "mongoose";

const UserModel = mongoose.model("User", {
  id: Number,
  firstName: String,
  email: String,
  password: String,
  birthday: {
    day: Number,
    month: Number,
    year: Number,
  },
  playlists: [Number],
  registerDate: Number,
  terms: Boolean,
});

export default UserModel;