import { Column, CreateDateColumn, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { PhotosOccurrences } from "./PhotosOccurences"
import { PhotosOffenders } from "./PhotosOffenders";
import { Problems } from "./Problems";
import { StatusOccurrences } from "./StatusOccurrences";
import { UsersAdmin } from "./UsersAdminEntity";
import { Users } from "./UsersEntity";

class Occurrences {
    
    @PrimaryColumn()
    id: string;

    @Column()
    status_occurency_id: string;

    @OneToOne(() => StatusOccurrences)
    @JoinColumn({name: 'status_occurency_id'})
    status: StatusOccurrences

    @Column()
    user_admin_id: string;

    @OneToOne(() => UsersAdmin)
    @JoinColumn({name: 'user_admin_id'})
    userAdmin: UsersAdmin

    @Column()
    user_id: string;

    @OneToOne(() => Users)
    @JoinColumn({name: 'user_id'})
    user: Users

    @Column()
    problem_id: string;

    @OneToOne(() => Problems)
    @JoinColumn({name: 'problem_id'})
    problem: Problems

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
    
    @OneToMany(() => PhotosOccurrences, photo => photo.occurence_id)
    photosOccurences: PhotosOccurrences[]

    @OneToMany(() => PhotosOffenders, photo => photo.occurence_id)
    photosOffenders: PhotosOffenders[]
}

export {
    Occurrences
}