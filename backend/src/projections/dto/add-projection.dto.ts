import { IsString, IsNumber, IsBoolean, IsNotEmpty } from "class-validator";
import { Municipality } from "../entities/municipality.entity";
import { Party } from "../entities/party.entity";

export class AddProjectionDto {
  @IsString()
  readonly label: string;

  @IsBoolean()
  readonly official: boolean;

  @IsNumber()
  readonly validVotes: number;

  @IsNotEmpty()
  readonly municipality: Municipality;

  @IsNotEmpty()
  readonly parties: Party[];
}
