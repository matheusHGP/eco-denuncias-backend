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
import { UsersAdminService } from "./UsersAdminService";
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
const usersAdminService = new UsersAdminService()
const problemsService = new ProblemsService()
const photosServices = new PhotosServices()

class OccurrencesAdminService {
    user_id: any
    relations: any[]

    constructor(user_id?: any) {
        this.user_id = user_id
        this.relations = ['user', 'userAdmin', 'statusOccurrence', 'problem', 'photos']
    }

    async update({ id, status_occurency_id, number_infringement }) {
        const occurrencesRepository = getCustomRepository(OccurrencesRepository)
        const statusOccurrencesRepository = getCustomRepository(StatusOccurrencesRepository)

        const occurrenceExists = await occurrencesRepository.findOne({ where: { id }, relations: ['userAdmin', 'user', 'statusOccurrence', 'problem', 'photos'] })
        if (!occurrenceExists) {
            throw new Error('Ocorrência não encontrada')
        }

        const statusOccurrencyExists = await statusOccurrencesRepository.findOne({ value: status_occurency_id })
        if (!statusOccurrencyExists) {
            throw new Error('Status não encontrado')
        }

        const user = await usersAdminService.find(this.user_id)

        occurrenceExists.statusOccurrence.id = statusOccurrencyExists.id
        occurrenceExists.number_infringement = number_infringement
        occurrenceExists.userAdmin = user

        if (occurrenceExists.photos.length) {
            await photosServices.delete(occurrenceExists.photos)
            occurrenceExists.photos = []
        }

        await occurrencesRepository.save(occurrenceExists)

        return occurrenceExists
    }

    async getAll() {
        const occurrencesRepository = getCustomRepository(OccurrencesRepository)
        const occurrences = await occurrencesRepository.find({ relations: this.relations })

        return occurrences
    }

    async getOnly(id: string) {
        const occurrencesRepository = getCustomRepository(OccurrencesRepository)
        const occurrence = await occurrencesRepository.findOne({ where: { id }, relations: this.relations })

        return occurrence
    }
}

export {
    OccurrencesAdminService
}