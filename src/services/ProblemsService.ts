import { getCustomRepository } from "typeorm"
import { ProblemsRepository } from "../repositories/ProblemsRepository"

class ProblemsService {
    async find(id: string) {
        const problemsRepository = getCustomRepository(ProblemsRepository)
        const problemExists = await problemsRepository.findOne({ id })

        if (!problemExists) {
            throw new Error('Problema não encontrado')
        }

        return problemExists
    }

    async getAll() {
        const problemsRepository = getCustomRepository(ProblemsRepository)
        const problems = await problemsRepository.find({
            where: {
                status: 1
            }
        })

        return problems
    }
}

export {
    ProblemsService
}