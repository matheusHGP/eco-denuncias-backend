import { getCustomRepository } from "typeorm"
import { UsersAdminRepository } from "../repositories/UsersAdminRepository"
import { compare, hash } from 'bcryptjs'
import { response } from "express"
import { v4 as uuid, V4Options, validate } from 'uuid'

interface IUsersAdminPayload {
    name: string;
    email: string;
    chapa: string;
    password: string;
}

interface IUsersAdminPayloadPut {
    name: string;
    email: string;
    chapa: string;
    password: string;
    new_password: string
}

class UsersAdminService {
    async create({ name, email, chapa, password }: IUsersAdminPayload) {
        const usersAdminRepository = getCustomRepository(UsersAdminRepository)

        const [userAdminByEmail, userAdminByChapa] = await Promise.all(
            [
                usersAdminRepository.findOne({ email }),
                usersAdminRepository.findOne({ chapa })
            ]
        )

        if (userAdminByEmail || userAdminByChapa) {
            throw new Error('Usuário já cadastrado com esse email ou chapa')
        }

        const hashPassword = await hash(password, 8)

        const userAdmin = usersAdminRepository.create({
            name,
            email,
            chapa,
            password: hashPassword
        })

        await usersAdminRepository.save(userAdmin)

        return userAdmin
    }

    async update(id: string, { name, email, chapa, password, new_password }: IUsersAdminPayloadPut) {
        const usersAdminRepository = getCustomRepository(UsersAdminRepository)

        let userAdminExists = await usersAdminRepository.findOne({ id })
        if (!userAdminExists) {
            throw new Error('Usuário não encontrado')
        }

        console.log(userAdminExists.password)
        const hashPassword = await hash(password, 8)
        console.log(hashPassword)

        const checkedPassword = await compare(userAdminExists.password, hashPassword)
        console.log(checkedPassword)
        if (!checkedPassword) {
            throw new Error('Senha incorreta')
        }

        const hashNewPassword = await hash(new_password, 8)

        userAdminExists = { ...userAdminExists, name, email, chapa, password: hashNewPassword }

        const userAdmin = await usersAdminRepository.save(userAdminExists)
        console.log(userAdmin)
        return userAdmin
    }
}

export {
    UsersAdminService
}