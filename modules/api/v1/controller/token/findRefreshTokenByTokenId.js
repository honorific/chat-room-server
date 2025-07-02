import Token from '../../models/Token.js'
import jwt from 'jsonwebtoken'

export const findRefreshTokenByTokenId = async (token) => {
  try {
    const {tokenId} = jwt.decode(token)
    console.log('tokenId is: ', tokenId)
    try {
      const refreshToken = await Token.findOne({
        tokenId,
      })
      return {
        success: true,
        refreshToken: refreshToken.refreshToken,
      }
    } catch (err) {
      return {
        success: false,
        msg: `error occourd during find in tokens. error: ${err}`,
      }
    }
  } catch (err) {
    return {
      success: false,
      msg: `you have entered an invalid token. error: ${err}`,
    }
  }
}
