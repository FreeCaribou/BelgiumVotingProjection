import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Municipality } from "./municipality.entity";
import { Party } from "./party.entity";

@Entity()
export class Projection {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    label: string;

    @Column()
    date: Date;

    @Column({ default: false })
    officiel: boolean;

    @Column()
    validVotes: number;

    @ManyToOne(() => Municipality, (municipality) => municipality.projections)
    municipality: Municipality;
    static municipalityRelationName = 'municipality';

    @OneToMany(() => Party, (party) => party.projection)
    parties: Party[];
    static partiesRelationName = 'parties';
}