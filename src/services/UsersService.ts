import { getCustomRepository } from "typeorm"
import { UsersRepository } from "../repositories/UsersRepository"
import { compare, hash } from 'bcryptjs'

interface IUserPayload {
    name: string;
    email: string;
    last_name: string;
    whatsapp: string;
    password: string;
    copy_password: string;
    cpf: string;
    cep: string;
}

interface IUserPayloadPut {
    name: string;
    email: string;
    last_name: string;
    whatsapp: string;
    password: string;
    new_password: string;
    cpf: string;
    cep: string;
}

class UsersService {
    async create({ name, email, last_name, whatsapp, password, copy_password, cpf, cep }: IUserPayload) {
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
            last_name,
            whatsapp,
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

    async update(id: string, { name, email, last_name, whatsapp, password, new_password, cpf, cep }: IUserPayloadPut) {
        const usersRepository = getCustomRepository(UsersRepository)
        let userExists = await usersRepository.findOne({ id })

        if (!userExists) {
            throw new Error('Usuário não encontrado')
        }

        const checkedPassword = await compare(password, userExists.password)
        if (!checkedPassword) {
            throw new Error('Senha incorreta')
        }

        let hashNewPassword = password
        if(new_password){
            hashNewPassword = await hash(new_password, 8)
        }

        userExists = { ...userExists, name, email, last_name, whatsapp, password: hashNewPassword, cpf, cep }

        const userAdmin = await usersRepository.save(userExists)
        return userAdmin
    }
}

export {
    UsersService
}