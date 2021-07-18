import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { occurrences } from "./occurrences";
import { v4 as uuid } from 'uuid'

@Entity('photos')
class Photos {

    @PrimaryColumn()
    id: string;

    @Column()
    observation: string;

    @Column()
    hash_image: string;

    @Column()
    is_occurrence: boolean;
    
    @Column()
    occurrence_id: string;

    @JoinColumn({name: 'occurrence_id'})
    @ManyToOne(() => occurrences, occurrences => occurrences.photos)
    occurrence: occurrences;

    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }
}

export {
    Photos
}