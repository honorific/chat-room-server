export const verifyAccessToken = async (req, res, next) => {
  jwt.verify(
    req.body.token ?? req.query.token,
    process.env.ACCESS_TOKEN_SECRET,
    (error, _verified) => {
      if (error) {
        return res.status(401).json('unAuthoried')
      } else {
        next()
      }
    },
  )
}
