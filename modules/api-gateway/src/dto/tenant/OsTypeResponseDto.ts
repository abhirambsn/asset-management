import { IsString } from 'class-validator';

export class OsTypeResponseDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  workspaceId: string;
}
