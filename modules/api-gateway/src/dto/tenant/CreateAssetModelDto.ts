export class CreateAssetModelDto {
  typeId: string;
  name: string;
  company: string;
  releaseYear: number;
  specs: Record<string, string>;
  workspaceId: string;
}
