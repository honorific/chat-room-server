import jwt from 'jsonwebtoken'

export const getNewAccessToken = async (req, res) => {
  const tokenInURL = req.query.token
  const {
    token: {refreshToken},
  } = jwt.decode(tokenInURL)
  try {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (error, _user) => {
        if (error) return res.status(403).json('you are not signed in')
        try {
          const accessToken = jwt.sign(
            {token: refreshToken},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '15s'},
          )
          res.json({token: accessToken})
        } catch (err) {
          console.log(err)
          res.json('could not create a new access token')
        }
      },
    )
  } catch (err) {
    console.log(err)
    res.status(403).json('you are not signed in')
  }
}
