import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Party } from "./party.entity";
import { Projection } from "./projection.entity";

export enum ProvinceEnum {
    BBW = 'BBW',
}

@Entity()
export class Municipality {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    label: string;

    @Column()
    totalSeats: number;

    @Column({
        type: "enum",
        enum: ProvinceEnum,
        default: ProvinceEnum.BBW,
    })
    province: ProvinceEnum;

    @Column({ default: false })
    priority: boolean;

    @OneToMany(() => Projection, (projection) => projection.municipality)
    projections: Projection[];
    static projectionsRelationName = 'projections';
}