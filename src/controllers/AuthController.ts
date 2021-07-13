import { Request, Response } from 'express'
import { AuthService } from '../services/AuthService'

class AuthController {
    async handle(request: Request, response: Response) {
        const authService = new AuthService()

        const { email, password } = request.body

        const token = await authService.auth({ email, password })

        return response.json({
            token
        })
    }
}

export {
    AuthController
}