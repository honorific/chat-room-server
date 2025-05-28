const getTokenInRequest = (authHeader) => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({error: 'Unauthorized: No token provided'})
  }
  const tokenInReq = authHeader.split(' ')[1]
  return tokenInReq
}

export default getTokenInRequest
