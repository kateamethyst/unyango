import User from '../models/user.model';

export const store = async (req, res) => {
  const user = new User(req.body);
  await user.save();

  const token = await user.generateAuthToken();
  res.status(201).json({
    user, token
  });
}

export const authenticate = async (req, res) => {
  const {email, password} = req.body;
  const user = await User.authenticate(email, password);
  if (!user) {
    res.status(401).json({
      error: 'Not Authenticated'
    })
  }

  const token = await user.generateAuthToken();
  res.status(200).json({
    user,
    token
  })
}