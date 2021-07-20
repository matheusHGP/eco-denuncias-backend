import { Request, Response, response } from "express"
import { verify } from "jsonwebtoken"
import { OccurrencesAdminSchema } from "../schemas/OccurrencesAdminSchema"
import { OccurrencesSchema } from "../schemas/OccurrencesSchema"
import { OccurrencesAdminService } from "../services/OccurrencesAdminService"

class OccurrencesAdminController {
    async update(request: Request, response: Response) {
        const { status_occurency_id, number_infringement } = request.body
        const { id } = request.params

        const authToken = request.headers.authorization
        const [, token] = authToken.split(' ')
        const tokenDecoded = verify(token, process.env.SECRET_TOKEN_ADMIN_KEY)

        const occurrencesAdminService = new OccurrencesAdminService(tokenDecoded.sub)
        const occurrence = await occurrencesAdminService.update({ id, status_occurency_id, number_infringement })

        return response.json(new OccurrencesSchema(occurrence))
    }

    async getAll(request: Request, response: Response) {
        const occurrencesAdminService = new OccurrencesAdminService()
        const occurrences = await occurrencesAdminService.getAll()

        const occurrencesFormated = occurrences.map(occurrence => {
            return new OccurrencesAdminSchema(occurrence)
        })

        return response.json(occurrencesFormated)
    }

    async getOnly(request: Request, response: Response) {
        const { id } = request.params

        const occurrencesAdminService = new OccurrencesAdminService()
        const occurrence = await occurrencesAdminService.getOnly(id)

        return response.json(new OccurrencesAdminSchema(occurrence))
    }
}

export {
    OccurrencesAdminController
}