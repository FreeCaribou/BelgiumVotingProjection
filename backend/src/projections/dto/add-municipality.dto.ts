import { IsOptional, IsString, IsNumber, IsBoolean } from "class-validator";

export class AddMunicipalityDto {
  @IsString()
  readonly label: string;

  @IsNumber()
  readonly totalSeats: number;

  @IsOptional()
  @IsBoolean()
  readonly priority: boolean;
}