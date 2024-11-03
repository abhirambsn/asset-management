import { IsString, IsNumber } from 'class-validator';

export class ModelResponseDto {
  @IsString()
  typeId: string;

  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  company: string;

  @IsNumber()
  releaseYear: number;

  specs: Record<string, string>;

  @IsString()
  workspaceId: string;
}
