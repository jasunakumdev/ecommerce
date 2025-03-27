import jwt from 'jsonwebtoken'

const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || 'your-access-secret'
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || 'your-refresh-secret'

export function generateAccessToken(user: {
  id: number
  username: string
  role: string
}) {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '15m' }) // Expires in 15 mins
}

export function generateRefreshToken(user: { id: number }) {
  return jwt.sign({ id: user.id }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' }) // Expires in 7 days
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, ACCESS_TOKEN_SECRET)
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, REFRESH_TOKEN_SECRET)
}
