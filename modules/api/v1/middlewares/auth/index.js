import jwt from 'jsonwebtoken'

export const verifyAccessToken = async (req, res, next) => {
  jwt.verify(
    req.body.token ?? req.query.token,
    process.env.ACCESS_TOKEN_SECRET,
    (error, _verified) => {
      if (error) {
        return res
          .status(401)
          .json({success: false, msg: 'unAuthoried in middleware'})
      } else {
        next()
      }
    },
  )
}

export const getRefreshTokenFromAccessToken = (req, res, next) => {
  const tokenInURL = req.query.token
  try {
    const {
      token: {refreshToken},
    } = jwt.decode(tokenInURL)
    if (!refreshToken) {
      res.status(500).json('could not leave the unknown user')
    } else {
      req.refToken = refreshToken
      console.log('refToken is: ', req.refToken)
      next()
    }
  } catch (err) {
    console.log(err)
    res.status(500).json('could not leave the unknown user')
  }
}
