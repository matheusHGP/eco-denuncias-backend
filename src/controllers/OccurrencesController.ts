import { Request, Response, response } from "express"
import { verify } from "jsonwebtoken"
import { OccurrencesSchema } from "../schemas/OccurrencesSchema"
import { OccurrencesAdminService } from "../services/OccurrencesAdminService"
import { OccurrencesService } from "../services/OccurrencesService"

class OccurrencesController {
    async create(request: Request, response: Response) {
        const {
            problem_id,
            street,
            neighborhood,
            number,
            other_observations,
            date_occurred,
            offender_details,
            photos
        } = request.body

        const authToken = request.headers.authorization
        const [, token] = authToken.split(' ')
        const tokenDecoded = verify(token, process.env.SECRET_TOKEN_KEY)

        const occurrencesService = new OccurrencesService(tokenDecoded.sub)

        const occurrence = await occurrencesService.create({
            problem_id,
            street,
            neighborhood,
            number,
            other_observations,
            date_occurred,
            offender_details,
            photos
        })

        return response.json(new OccurrencesSchema(occurrence))
    }

    async getAll(request: Request, response: Response){
        const occurrencesService = new OccurrencesService()
        const occurrences = await occurrencesService.getAll()

        return response.json(occurrences.map(occurrence => new OccurrencesSchema(occurrence)))
    }

    async getOnly(request: Request, response: Response) {
        const { id } = request.params

        const occurrencesAdminService = new OccurrencesAdminService()
        const occurrence = await occurrencesAdminService.getOnly(id)

        return response.json(new OccurrencesSchema(occurrence))
    }
}

export {
    OccurrencesController
}