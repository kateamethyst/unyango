import User from '../models/user.model';

export const register = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
  
    const token = await user.generateAuthToken();
    res.status(201).json({
      user, token
    });
  } catch( error ) {
    res.send(error);
  }
}

export const getAuthenticated = async (req, res) => {
  const {email, password} = req.body;
  const user = await User.findByCredentials(email, password);
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