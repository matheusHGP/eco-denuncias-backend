import { Request, Response, response } from "express"
import { verify } from "jsonwebtoken"
import { OccurrencesSchema } from "../schemas/OccurrencesSchema"
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

    async update(request: Request, response: Response) {
        const { status_occurency_id, number_infringement } = request.body
        const { id } = request.params

        const authToken = request.headers.authorization
        const [, token] = authToken.split(' ')
        const tokenDecoded = verify(token, process.env.SECRET_TOKEN_ADMIN_KEY)

        const occurrencesService = new OccurrencesService(tokenDecoded.sub)
        const occurrence = await occurrencesService.update({ id, status_occurency_id, number_infringement })

        return response.json(new OccurrencesSchema(occurrence))
    }
}

export {
    OccurrencesController
}