import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm"
import { Photos } from "./photos";
import { problems } from "./problems";
import { statusOccurrences } from "./statusOccurrences";
import { UsersAdmin } from "./UsersAdminEntity";
import { Users } from "./UsersEntity";
import { v4 as uuid } from 'uuid'

@Entity('occurrences')
class occurrences {
    @PrimaryColumn()
    id: string;

    @Column()
    status_occurency_id: string;

    @OneToOne(() => statusOccurrences)
    @JoinColumn({ name: 'status_occurency_id' })
    statusOccurrence: statusOccurrences

    @Column()
    user_admin_id: string;

    @OneToOne(() => UsersAdmin)
    @JoinColumn({ name: 'user_admin_id' })
    userAdmin: UsersAdmin

    @Column()
    user_id: string;

    @OneToOne(() => Users)
    @JoinColumn({ name: 'user_id' })
    user: Users

    @Column()
    problem_id: string;

    @OneToOne(() => problems)
    @JoinColumn({ name: 'problem_id' })
    problem: problems

    @Column()
    street: string;

    @Column()
    neighborhood: string;

    @Column()
    number: number;

    @Column()
    other_observations: string;

    @Column()
    number_infringement: number;

    @Column()
    date_occurred: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column()
    offender_details: string;

    @OneToMany(() => Photos, photo => photo.occurrence)
    photos: Photos[]

    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }
}

export {
    occurrences
}