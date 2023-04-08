import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Municipality } from "./municipality.entity";
import { Projection } from "./projection.entity";

@Entity()
export class Party {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    label: string;

    @Column()
    votes: number;

    @ManyToOne(() => Projection, (projection) => projection.parties, { onDelete: 'CASCADE' })
    projection: Projection;
}