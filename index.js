import express from 'express'
import mongoose from 'mongoose'
import passport from 'passport'
import { Strategy as FacebookStrategy } from 'passport-facebook'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI)

const userSchema = new mongoose.Schema({
  facebookId: String,
  name: String,
  email: String
})

const User = mongoose.model('User', userSchema)

passport.use(new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['id', 'displayName', 'emails']
  },
  async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ facebookId: profile.id })
    if (existingUser) return done(null, existingUser)

    const newUser = await User.create({
      facebookId: profile.id,
      name: profile.displayName,
      email: profile.emails?.[0]?.value || ''
    })

    done(null, newUser)
  }
))

app.use(passport.initialize())

app.get('/', (req, res) => {
  res.json({ message: 'Facebook Login with JWT' })
})

app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
)

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id, name: req.user.name }, process.env.JWT_SECRET, { expiresIn: '1h' })
    res.json({ token, user: req.user })
  }
)

app.get('/profile', async (req, res) => {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).json({ message: 'Missing token' })

  try {
    const decoded = jwt.verify(authHeader.split(' ')[1], process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)
    res.json({ user })
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' })
  }
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server running on port ${port}`))
