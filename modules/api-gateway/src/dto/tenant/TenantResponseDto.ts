import { IsString, IsUUID, IsArray } from 'class-validator';

export class TenantResponseDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  owner: string;

  @IsArray()
  @IsUUID('all', { each: true })
  users: string[];
}
