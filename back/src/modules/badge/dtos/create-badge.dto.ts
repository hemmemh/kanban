import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNumber, IsOptional, IsString } from "class-validator"

export class CreateBadgeDTO {

  @ApiProperty({ example: 'метка-1', description: 'Имя метки' })
  @IsString()
  name:string

  @ApiProperty({ example: '#fff', description: 'Цвет метки' })
  @IsNumber()
  color:string

  @ApiProperty({ example: 0, description: 'Позиция метки' })
  @IsNumber()
  pos:number

  @ApiPropertyOptional({ example: 1, description: 'ID карточки' })
  @IsOptional()
  @IsNumber()
  cardId?:number

  @ApiProperty({ example: 1, description: 'ID доски' })
  @IsNumber()
  boardId:number

}