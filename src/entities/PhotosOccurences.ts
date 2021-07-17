import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import { Occurrences } from "./Occurrences";

@Entity('photos_occurrences')
class PhotosOccurrences {
    @PrimaryColumn()
    id: string;

    @Column()
    observation: string;

    @Column()
    hash_image: string;

    @Column()
    occurence_id: string;

    @JoinColumn({name: 'occurence_id'})
    @ManyToOne(() => Occurrences, occurence => occurence.photosOccurences)
    ocurrence: Occurrences

}

export {
    PhotosOccurrences
}