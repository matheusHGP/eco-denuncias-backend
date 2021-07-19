import { Request, Response } from "express-serve-static-core"
import { UsersSchema } from "../schemas/UsersSchema"
import { UsersService } from "../services/UsersService"

const usersService = new UsersService()

class UsersController {
    async create(request: Request, response: Response) {
        const { name, email, last_name, whatsapp, password, cpf, cep } = request.body

        const user = await usersService.create({ name, email, last_name, whatsapp, password, cpf, cep })

        return response.json(new UsersSchema(user))
    }

    async update(request: Request, response: Response) {
        const { id } = request.params
        const { name, email, last_name, whatsapp, password, new_password, cpf, cep } = request.body

        const user = await usersService.update(id, { name, email, last_name, whatsapp, password, new_password, cpf, cep })

        return response.json(new UsersSchema(user))
    }

    async getOnly(request: Request, response: Response) {
        const { id } = request.params

        const user = await usersService.find(id)
        
        return response.json(new UsersSchema(user))
    }
}

export {
    UsersController
}