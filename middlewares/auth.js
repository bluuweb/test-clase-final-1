// middleware bearer token
export const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) {
    return res.status(401).json({
      ok: false,
      message: 'No token provided',
    })
  }
  const token = authorization.split(' ')[1]
  if (token !== 'exampleToken') {
    return res.status(401).json({
      ok: false,
      message: 'Invalid token',
    })
  }
  next()
}
