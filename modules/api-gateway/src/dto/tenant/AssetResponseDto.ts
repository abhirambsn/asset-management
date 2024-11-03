import { IsString, IsDate, IsNumber } from 'class-validator';
import { ModelResponseDto } from './ModelResponseDto';
import { OsTypeResponseDto } from './OsTypeResponseDto';
import { AssetTypeResponseDto } from './AssetTypeResponseDto';

export class AssetResponseDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  typeId: string;

  @IsString()
  osTypeId: string;

  @IsString()
  osVersion: string;

  @IsDate()
  registrationDate: Date;

  @IsDate()
  lastUpdated: Date;

  @IsString()
  modelId: string;

  @IsString()
  owner: string;

  @IsString()
  class: string;

  @IsString()
  model: ModelResponseDto;

  @IsString()
  osType: OsTypeResponseDto;

  @IsString()
  type: AssetTypeResponseDto;

  @IsNumber()
  value: number;

  @IsString()
  workspaceId: string;
}
