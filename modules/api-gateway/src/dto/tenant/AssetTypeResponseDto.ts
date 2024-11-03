import { IsString } from 'class-validator';

export class AssetTypeResponseDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  workspaceId: string;
}
