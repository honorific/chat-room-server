import Token from '../../models/Token'

export const findRefreshTokenByTokenId = async (token) => {
  try {
    const {
      token: {tokenId},
    } = jwt.decode(token)
    try {
      const refreshToken = await Token.findOne({
        tokenId,
      })
      return {
        success: true,
        ...refreshToken,
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
