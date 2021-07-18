import { EntityRepository, Repository } from "typeorm";
import { statusOccurrences } from "../entities/statusOccurrences";

@EntityRepository(statusOccurrences)
class StatusOccurrencesRepository extends Repository<statusOccurrences>{

}

export {
    StatusOccurrencesRepository
}