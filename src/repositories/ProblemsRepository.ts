import { EntityRepository, Repository } from "typeorm";
import { problems } from "../entities/problems";

@EntityRepository(problems)
class ProblemsRepository extends Repository<problems>{

}

export {
    ProblemsRepository
}