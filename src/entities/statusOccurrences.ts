import { Column, Entity, PrimaryColumn } from "typeorm"
import { v4 as uuid } from 'uuid'

@Entity('status_ocurrences')
class statusOccurrences {

    @PrimaryColumn()
    id: string;

    @Column()
    description: string;

    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }
}

export {
    statusOccurrences
}