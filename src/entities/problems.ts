import { Column, Entity, PrimaryColumn } from "typeorm"
import { v4 as uuid } from 'uuid'

@Entity('problems')
class problems {
    @PrimaryColumn()
    id: string;

    @Column()
    description: string;

    @Column()
    status: number;

    @Column()
    explication: string;

    @Column()
    hash_image: string;

    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }
}

export {
    problems
}