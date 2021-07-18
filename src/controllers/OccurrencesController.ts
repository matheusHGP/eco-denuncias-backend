import { Request, Response, response } from "express"
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

        const occurrencesService = new OccurrencesService()
        
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

        return response.json(occurrence)
    }
}

export {
    OccurrencesController
}