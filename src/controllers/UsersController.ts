import { Request, Response } from "express-serve-static-core"
import { UsersSchema } from "../schemas/UsersSchema"
import { UsersService } from "../services/UsersService"

const usersService = new UsersService()

class UsersController {
    async create(request: Request, response: Response) {
        const { name, email, password, copy_password, cpf, cep } = request.body

        const user = await usersService.create({ name, email, password, copy_password, cpf, cep })

        return response.json(new UsersSchema(user))
    }
}

export {
    UsersController
}