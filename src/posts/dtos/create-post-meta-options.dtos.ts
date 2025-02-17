import { IsNotEmpty, IsString } from 'class-validator';

/* eslint-disable @typescript-eslint/no-explicit-any */
export class CreatePostMetaOptionsDto {
  @IsString()
  @IsNotEmpty()
  key: string;
  @IsNotEmpty()
  value: any;
}
