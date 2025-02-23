import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
export class GetUserParamDto {
  @ApiPropertyOptional({
    description: 'Get user By Id',
    example: '1',
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id?: number;
}
