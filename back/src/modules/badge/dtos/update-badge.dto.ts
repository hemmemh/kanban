import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"


export class UpdateBadgeDTO {

  @ApiProperty({ example: '1', description: 'ID метки' })
  @IsNumber()
  id:number

  @ApiProperty({ example: 'метка-1-обновлена', description: 'Имя метки' })
  @IsString()
  name:string

  @ApiProperty({ example: '#f2f', description: 'Цвет метки' })
  @IsString()
  color:string



}