import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

// aqui alimenta o "req.user"
export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers['authorization'] as string

  if (!auth) return res.status(401).json({ auth: false, message: 'No token provided.' })

  jwt.verify(auth.split(" ")[1], process.env.SECRET, function (err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' })
    req.user.uuid = decoded.id
    next()
  })
}
