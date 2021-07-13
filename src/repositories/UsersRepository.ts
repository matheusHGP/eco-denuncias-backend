import { EntityRepository, Repository } from "typeorm";
import { Users } from "../entities/UsersEntity";

@EntityRepository(Users)
class UsersRepository extends Repository<Users>{

}

export {
    UsersRepository
}