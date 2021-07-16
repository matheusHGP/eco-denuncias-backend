import { EntityRepository, Repository } from "typeorm";
import { UsersAdmin } from "../entities/UsersAdminEntity";

@EntityRepository(UsersAdmin)
class UsersAdminRepository extends Repository<UsersAdmin>{

}

export {
    UsersAdminRepository
}