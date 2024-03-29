/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../config"
const auth = (...roles: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization
            if (!token) {
                throw new Error('You do not have the necessary permissions to access this resource.')
            }
            jwt.verify(token, config.ACCESS_SEC_JWT as string, function (err, decoded) {
                if (err) {
                    throw new Error('You do not have the necessary permissions to access this resource.')
                }
                const role = (decoded as JwtPayload).role
                if (roles.length > 0 && !roles.includes(role)) {
                    throw new Error('You do not have the necessary permissions to access this resource.')
                }
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