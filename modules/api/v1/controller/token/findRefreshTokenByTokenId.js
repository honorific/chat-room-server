import Token from '../../models/Token.js'
import jwt from 'jsonwebtoken'

export const findRefreshTokenByTokenId = async (token) => {
  try {
    const {tokenId} = jwt.decode(token)
    console.log('tokenId is: ', tokenId)
    try {
      const refreshTokenObj = await Token.findOne({
        tokenId,
      })
      console.log('refreshTokenObj is: ', refreshTokenObj)
      return {
        success: true,
        refreshToken: refreshTokenObj.refreshToken,
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
