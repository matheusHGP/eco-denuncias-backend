import { getCustomRepository, getRepository } from "typeorm";
import { occurrences } from "../entities/occurrences";
import { photos } from "../entities/photos";
import { OccurrencesRepository } from "../repositories/OccurrencesRepository";
import { ProblemsRepository } from "../repositories/ProblemsRepository";

interface IOccurrencesPayload {
    problem_id: string;
    street: string;
    neighborhood: string;
    number: number;
    other_observations: string;
    date_occurred: Date;
    offender_details: string;
    photos: photos[]
}

class OccurrencesService {
    async create({
        problem_id,
        street,
        neighborhood,
        number,
        other_observations,
        date_occurred,
        offender_details,
        photos
    }: IOccurrencesPayload) {
        const occurrencesRepository = getCustomRepository(OccurrencesRepository)
        console.log('foi')
        const problemsRepository = getCustomRepository(ProblemsRepository)

        const problem = problemsRepository.findOne({ id: problem_id })
        if (!problem) {
            throw new Error('Problema não encontrado')
        }

        const occurrence = new occurrences()
        occurrence.street = street
        occurrence.neighborhood = neighborhood
        occurrence.number = number
        occurrence.other_observations = other_observations
        occurrence.date_occurred = date_occurred
        occurrence.offender_details = offender_details
        // occurrence.photos = photos

        // await occurrencesRepository.save(occurrence)

        return occurrence
    }
}

export {
    OccurrencesService
}