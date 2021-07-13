import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization

    if (!authToken) {
        return response.status(401).end()
    }

    const [, token] = authToken.split(' ')

    try {
        verify(token, process.env.SECRET_TOKEN_KEY)
        return next()
    } catch (error) {
        return response.status(401).end()
    }
}

export {
    ensureAuthenticated
}