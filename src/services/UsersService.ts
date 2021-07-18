import { getCustomRepository } from "typeorm"
import { UsersRepository } from "../repositories/UsersRepository"
import { hash } from 'bcryptjs'

interface IUserPayload {
    name: string;
    email: string;
    password: string;
    copy_password: string;
    cpf: string;
    cep: string;
}

class UsersService {
    async create({ name, email, password, copy_password, cpf, cep }: IUserPayload) {
        const usersRepositorys = getCustomRepository(UsersRepository)
        const userExists = await usersRepositorys.findOne({ email })

        if (userExists) {
            throw new Error('Usuário já cadastrado com esse email')
        }

        if (password !== copy_password) {
            throw new Error('As senhas devem ser iguais')
        }

        const hashPassword = await hash(password, 8)

        const user = usersRepositorys.create({
            name,
            email,
            password: hashPassword,
            cpf,
            cep
        })

        await usersRepositorys.save(user)

        return user
    }

    async find(id: string){
        const usersRepositorys = getCustomRepository(UsersRepository)
        const userExists = await usersRepositorys.findOne({ id })

        if (!userExists) {
            throw new Error('Usuário não encontrado')
        }

        return userExists
    }
}

export {
    UsersService
}