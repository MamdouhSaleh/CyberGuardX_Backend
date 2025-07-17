import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  bio: String,
  avatar: String,
  social: {
    twitter: String,
    github: String
  }
});

const Profile = mongoose.model('Profile', ProfileSchema);
export default Profile;
