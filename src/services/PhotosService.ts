import { getCustomRepository } from "typeorm"
import { Photos } from "../entities/photos"
import { PhotosRepository } from "../repositories/PhotosRepository"

interface IPhotosPayload {
    observation: string;
    hash_image: string;
    is_occurrence: boolean;
    occurrence_id: string
}

class PhotosServices {
    async create({ observation, hash_image, is_occurrence, occurrence_id }: IPhotosPayload) {
        const photosRepository = getCustomRepository(PhotosRepository)
        const photo = photosRepository.create({ observation, hash_image, is_occurrence, occurrence_id })

        await photosRepository.save(photo)
        return photo
    }

    async createPhotos(photos: Photos[]) {
        const photosRepository = getCustomRepository(PhotosRepository)
        const createdPhotos = await photosRepository.create(photos)

        await photosRepository.save(createdPhotos)
        return createdPhotos
    }

    async delete(photos: Photos[]) {
        const photosRepository = getCustomRepository(PhotosRepository)
        const deletedPhotos = await photosRepository.delete(photos.map(photo => photo.id))

        return deletedPhotos
    }

    async findAllByOccurrenceId(occurrence_id: string) {
        const photosRepository = getCustomRepository(PhotosRepository)
        const photos = await photosRepository.find({ where: {occurrence_id} })
        return photos
    }
}

export {
    PhotosServices
}