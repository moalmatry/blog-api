import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { postStatus } from '../enums/postStatus.enum';
import { postType } from '../enums/postType.enum';
import { CreatePostMetaOptionsDto } from '../../meta-options/dtos/create-post-meta-options.dtos';

export class CreatePostDto {
  @ApiProperty({
    description: 'Create post title',
    example: 'My First Post',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(512)
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Create post content',
    example: 'post',
    enum: postType,
  })
  @IsEnum(postType)
  @IsNotEmpty()
  postType: postType;

  @ApiProperty({
    description: 'Post Slug',
    example: 'hello-world',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'Slug should be in format "my-post-title" or "my-post-title-123"',
  })
  @MaxLength(256)
  slug: string;

  @ApiProperty({
    description: 'Post status ',
    example: 'published',
    enum: postStatus,
  })
  @IsEnum(postStatus)
  @IsNotEmpty()
  status: postStatus;

  @ApiPropertyOptional({
    description: 'Post content',
    example: 'post',
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({
    description:
      'Serialize your json object else a validation error will be thrown',
  })
  @IsOptional()
  @IsJSON()
  schema?: string;

  @ApiPropertyOptional({
    description: 'Post featured image URL',
    example: 'https://example.com/featured-image.jpg',
  })
  @IsUrl()
  @IsOptional()
  @MaxLength(1024)
  featuredImageUrl?: string;

  @ApiPropertyOptional({
    description: 'Date and time for post ',
    example: '2024-03-16T07:46:32+0000',
  })
  @IsISO8601()
  @IsOptional()
  publishOn?: Date;

  @ApiPropertyOptional({
    description: 'Post tags',
    example: ['typescript', 'backend'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MinLength(3, { each: true })
  tags: string[];

  @ApiPropertyOptional({
    type: 'object',
    readOnly: false,
    additionalProperties: true,
    items: {
      type: 'object',
      properties: {
        metaValue: {
          type: 'json',
          description: 'The meta value is json string',
          example: '{"sidebarEnabled":true}',
        },
      },
    },
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptionsDto)
  metaOptions?: CreatePostMetaOptionsDto | null;

  @ApiProperty({
    description: 'Author ID',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  authorId: number;
}
