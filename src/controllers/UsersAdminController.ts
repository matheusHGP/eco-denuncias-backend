import { Request, Response } from "express";
import { UsersAdminSchema } from "../schemas/UsersAdminSchema";
import { UsersAdminService } from "../services/UsersAdminService";

const usersAdminService = new UsersAdminService()

class UsersAdminController {
    async create(request: Request, response: Response) {
        const { name, email, chapa, password } = request.body

        const userAdmin = await usersAdminService.create({ name, email, chapa, password })

        return response.json(new UsersAdminSchema(userAdmin))
    }

    async update(request: Request, response: Response) {
        const { id } = request.params
        const { name, email, chapa, password, new_password } = request.body

        const userAdmin = await usersAdminService.update(id, { name, email, chapa, password, new_password })

        return response.json(new UsersAdminSchema(userAdmin))
    }

    async getAll(request: Request, response: Response) {
        const usersAdmin = await usersAdminService.findAll()

        return response.json(usersAdmin.map(user => {
            return new UsersAdminSchema(user)
        }))
    }

    async getOnly(request: Request, response: Response) {
        const { id } = request.params

        const userAdmin = await usersAdminService.find(id)

        return response.json(new UsersAdminSchema(userAdmin))
    }
}

export {
    UsersAdminController
}