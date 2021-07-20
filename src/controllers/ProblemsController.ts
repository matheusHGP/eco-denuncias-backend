import { Request, Response, response } from "express"
import { verify } from "jsonwebtoken"
import { OccurrencesSchema } from "../schemas/OccurrencesSchema"
import { OccurrencesAdminService } from "../services/OccurrencesAdminService"
import { OccurrencesService } from "../services/OccurrencesService"
import { ProblemsService } from "../services/ProblemsService"

class ProblemsController {
    async getAll(request: Request, response: Response){
        const problemsService = new ProblemsService()
        const problems = await problemsService.getAll()

        return response.json(problems)
    }
}

export {
    ProblemsController
}