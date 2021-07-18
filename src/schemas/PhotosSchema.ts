class PhotosSchema{
    id: string;
    observation: string;
    hash_image: string;
    is_occurrence: boolean;    
    occurrence_id: string;

    constructor(photo){
        this.id = photo.id
        this.observation = photo.observation
        this.hash_image = photo.hash_image
        this.is_occurrence = photo.is_occurrence
        this.occurrence_id = photo.occurrence_id
    }
}

export {
    PhotosSchema
}