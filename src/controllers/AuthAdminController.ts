import { Request, Response } from "express";
import { AuthAdminService } from "../services/AuthAdminService";

const authAdminService = new AuthAdminService()

class AuthAdminController {
    async handle(request: Request, response: Response) {
        const { chapa, password } = request.body

        const token = await authAdminService.auth({ chapa, password })
        return response.json({
            token
        })
    }
}

export {
    AuthAdminController
}