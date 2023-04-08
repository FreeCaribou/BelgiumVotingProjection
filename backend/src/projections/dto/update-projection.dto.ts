import { IsNumber, IsBoolean, IsNotEmpty } from "class-validator";
import { Party } from "../entities/party.entity";

export class UpdateProjectionDto {
  @IsBoolean()
  readonly official: boolean;

  @IsNumber()
  readonly validVotes: number;

  @IsNotEmpty()
  readonly parties: Party[];
}
