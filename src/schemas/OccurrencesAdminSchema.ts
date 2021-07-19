import { occurrences } from "../entities/occurrences";
import { PhotosSchema } from "./PhotosSchema";
import { ProblemsSchema } from "./ProblemsSchema";
import { StatusOccurrencesSchema } from "./StatusOccurrencesSchema";
import { UsersAdminSchema } from "./UsersAdminSchema";
import { UsersSchema } from "./UsersSchema";

class OccurrencesAdminSchema {
    id: string;
    user: UsersSchema;
    userAdmin: UsersAdminSchema;
    street: string;
    neighborhood: string;
    number: number;
    other_observations: string;
    date_occurred: Date;
    offender_details: string;
    statusOccurrence: StatusOccurrencesSchema;
    problem: ProblemsSchema;
    created_at: Date
    updated_at: Date;
    photos: PhotosSchema[]

    constructor(occurrence: any) {
        this.id = occurrence.id;
        this.street = occurrence.street;
        this.neighborhood = occurrence.neighborhood;
        this.number = occurrence.number;
        this.other_observations = occurrence.other_observations;
        this.date_occurred = occurrence.date_occurred;
        this.offender_details = occurrence.offender_details;
        this.statusOccurrence = new StatusOccurrencesSchema(occurrence.statusOccurrence);
        this.user = new UsersSchema(occurrence.user);
        if (occurrence.userAdmin) {
            this.userAdmin = new UsersAdminSchema(occurrence.userAdmin);
        }
        this.problem = new ProblemsSchema(occurrence.problem);
        this.created_at = occurrence.created_at;
        this.updated_at = occurrence.updated_at;
        this.photos = occurrence.photos.map(photo => new PhotosSchema(photo));
    }
}

export {
    OccurrencesAdminSchema
}