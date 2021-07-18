import { EntityRepository, Repository } from "typeorm";
import { Photos } from "../entities/photos";
import 'reflect-metadata'

@EntityRepository(Photos)
class PhotosRepository extends Repository<Photos>{
    
}

export {
    PhotosRepository
}