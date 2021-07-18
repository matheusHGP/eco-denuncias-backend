import { JwtPayload } from "jsonwebtoken";
import { getCustomRepository, getRepository } from "typeorm";
import { occurrences } from "../entities/occurrences";
import { Photos } from "../entities/photos";
import { OccurrencesRepository } from "../repositories/OccurrencesRepository";
import { PhotosRepository } from "../repositories/PhotosRepository";
import { ProblemsRepository } from "../repositories/ProblemsRepository";
import { StatusOccurrencesRepository } from "../repositories/StatusOccurrencesRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import { statusOccurrence } from '../utils/statusOccurrence'
import { PhotosServices } from "./PhotosService";
import { ProblemsService } from "./ProblemsService";
import { UsersService } from "./UsersService";

interface IOccurrencesPayload {
    problem_id: string;
    street: string;
    neighborhood: string;
    number: number;
    other_observations: string;
    date_occurred: Date;
    offender_details: string;
    photos: Photos[]
}

const usersService = new UsersService()
const problemsService = new ProblemsService()
const photosServices = new PhotosServices()

class OccurrencesService {
    user_id: any

    constructor(user_id: any) {
        this.user_id = user_id
    }

    async create({ problem_id, street, neighborhood, number, other_observations, date_occurred, offender_details, photos }: IOccurrencesPayload) {
        const occurrencesRepository = getCustomRepository(OccurrencesRepository)
        const statusOccurrencesRepository = getCustomRepository(StatusOccurrencesRepository)

        const user = await usersService.find(this.user_id)

        const status = await statusOccurrencesRepository.findOne({
            value: statusOccurrence.PENDENTE.value
        })
        if (!status) {
            throw new Error('Status não encontrado')
        }

        const problem = await problemsService.find(problem_id)
        if (!problem) {
            throw new Error('Problema não encontrado')
        }

        const occurrence = occurrencesRepository.create({
            statusOccurrence: status,
            street,
            neighborhood,
            number,
            other_observations,
            date_occurred,
            offender_details,
            user,
            problem
        })

        await occurrencesRepository.save(occurrence)

        const createdPhotos = await photosServices.createPhotos(
            photos.map(photo => {
                return { ...photo, occurrence: occurrence }
            }))

        occurrence.photos = createdPhotos
        return occurrence
    }

    async update({ id, status_occurency_id, number_infringement }) {
        const occurrencesRepository = getCustomRepository(OccurrencesRepository)
        const statusOccurrencesRepository = getCustomRepository(StatusOccurrencesRepository)

        const occurrenceExists = await occurrencesRepository.findOne({ relations: ['photos'], where: { id: id } })
        if (!occurrenceExists) {
            throw new Error('Ocorrência não encontrada')
        }

        const statusOccurrencyExists = await statusOccurrencesRepository.findOne({ value: status_occurency_id })
        if (!statusOccurrencyExists) {
            throw new Error('Status não encontrado')
        }

        occurrenceExists.status_occurency_id = statusOccurrencyExists.id
        occurrenceExists.number_infringement = number_infringement
        occurrenceExists.user_admin_id = this.user_id
        console.log(occurrenceExists)

        photosServices.delete(occurrenceExists.photos)
        occurrenceExists.photos = []


        await occurrencesRepository.save(occurrenceExists)

        return occurrenceExists
    }
}

export {
    OccurrencesService
}