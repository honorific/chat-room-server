import jwt from 'jsonwebtoken'

export const generateAccessToken = (tokenId) => {
  const accessToken = jwt.sign(
    {tokenId},
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '1m',
    },
  )
  return accessToken
}
