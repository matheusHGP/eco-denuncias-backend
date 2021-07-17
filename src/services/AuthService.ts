import { UsersRepository } from "../repositories/UsersRepository"
import { compare, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { getCustomRepository } from "typeorm"

interface IAuthPayload {
    email: string;
    password: string;
}

class AuthService {
    async auth({ email, password }: IAuthPayload) {
        const usersRepository = getCustomRepository(UsersRepository)

        const user = await usersRepository.findOne({ email })
        if (!user) {
            throw new Error('Usuário ou senha incorretos')
        }

        const checkedPassword = await compare(password, user.password)
        if (!checkedPassword) {
            throw new Error('Usuário ou senha incorretos')
        }

        const token = sign(
            {
                email: user.email
            },
            process.env.SECRET_TOKEN_KEY,
            {
                subject: user.id,
                expiresIn: '1d'
            }
        )

        return token
    }
}

export {
    AuthService
}