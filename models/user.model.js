import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    trim: true
  },
  last_name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    validate: value => {
      if (!validator.isEmail(value)) {
        throw new Error({error: 'Invalid email address'})
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlenght: 7
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
})

userSchema.pre('save', async (next) => {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

userSchema.methods.generateAuthToken = async () => {
  const user = this;
  const token = jwt.sign({
    _id: user._id
  }, process.env.JWT_KEY);

  user.tokens = user.tokens.concat({token});
  await user.save();
  return token;
}

userSchema.statics.authenticateUser = async (email, pasword) => {
  const user = await User.findOne({email});
  if (user) {
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (isPasswordMatch) {
      return user;
    }
    return false;
  }
  return false;
}

const User = mongoose.model('User', userSchema);

module.exports = User;