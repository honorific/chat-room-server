import jwt from 'jsonwebtoken'

export const generateAccessToken = (refreshToken) => {
  const accessToken = jwt.sign(
    {token: refreshToken},
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: '1m'},
  )
  return accessToken
}
