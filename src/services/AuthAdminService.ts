import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { UsersAdminRepository } from "../repositories/UsersAdminRepository";

interface IAuthAdminPayload {
    chapa: string;
    password: string;
}

class AuthAdminService {
    async auth({ chapa, password }: IAuthAdminPayload) {
        const usersAdminRepository = getCustomRepository(UsersAdminRepository)

        const userAdmin = await usersAdminRepository.findOne({chapa})
        if(!userAdmin){
            throw new Error('Usuário ou senha incorretos')
        }

        const checkedPassword = await compare(password, userAdmin.password)
        if(!checkedPassword){
            throw new Error('Usuário ou senha incorretos')
        }

        const token = sign(
            {
                chapa: userAdmin.chapa
            },
            process.env.SECRET_TOKEN_ADMIN_KEY,
            {
                subject: userAdmin.id,
                expiresIn: '10d'
            }
        )

        return token
    }
}

export {
    AuthAdminService
}