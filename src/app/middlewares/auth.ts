import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../config"
const auth = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization
            if (!token) {
                throw new Error('You are not authorized')
            }
            jwt.verify(token, config.ACCESS_SEC_JWT as string, function (err, decoded) {
                if (err) {
                    throw new Error('You are not authorized')
                }
                console.log(decoded);
                req.user = decoded as JwtPayload
                next()
            })
        }
        catch (err) {
            next(err)
        }
    }
}

export default auth