import express from 'express'
import mongoose from 'mongoose'
import passport from 'passport'
import { Strategy as GitHubStrategy } from 'passport-github2'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI)

const userSchema = new mongoose.Schema({
  githubId: String,
  username: String,
  email: String
})

const User = mongoose.model('User', userSchema)

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK,
  scope: ['user:email']
}, async (accessToken, refreshToken, profile, done) => {
  const existingUser = await User.findOne({ githubId: profile.id })
  if (existingUser) return done(null, existingUser)

  const email = profile.emails?.[0]?.value || ''

  const newUser = await User.create({
    githubId: profile.id,
    username: profile.username,
    email
  })

  done(null, newUser)
}))

app.use(passport.initialize())

app.get('/', (req, res) => res.json({ message: 'GitHub OAuth with JWT' }))

app.get('/auth/github',
  passport.authenticate('github', { scope: ['user:email'] })
)

app.get('/auth/github/callback',
  passport.authenticate('github', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id, username: req.user.username }, process.env.JWT_SECRET, { expiresIn: '1h' })
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
  } catch {
    res.status(401).json({ message: 'Invalid token' })
  }
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running on port 3000')
})
