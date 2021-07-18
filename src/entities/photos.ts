import { Column, ManyToOne, PrimaryColumn } from "typeorm";
import { occurrences } from "./occurrences";

class photos {

    @PrimaryColumn()
    id: string;

    @Column()
    observation: string;

    @Column()
    hash_image: string;

    @Column()
    is_occurrence: boolean;
    
    @Column()
    occurrence_id: string

    // @ManyToOne(() => occurrences, occurrence => occurrence.photos)
    // occurrences: occurrences
}

export {
    photos
}