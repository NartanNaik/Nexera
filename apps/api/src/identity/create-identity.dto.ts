import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateIdentityDto {
  @IsString()
  @IsNotEmpty()
  handle!: string;

  @IsOptional()
  @IsString()
  displayName?: string;
}