import { EntityRepository, Repository } from "typeorm";
import { occurrences } from "../entities/occurrences";
import 'reflect-metadata'

@EntityRepository(occurrences)
class OccurrencesRepository extends Repository<occurrences>{
    
}

export {
    OccurrencesRepository
}