import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"


export class UpdateListDTO {

  @ApiProperty({ example: '1', description: 'ID колонки' })
  @IsNumber()
  id:number

  @ApiProperty({ example: 'колонка-1-обновлена', description: 'Имя колонки' })
  @IsString()
  name:string

  @ApiProperty({ example: '#f2f', description: 'Цвет колонки' })
  @IsString()
  color:string

  @ApiProperty({ example: 1, description: 'Позиция колонки' })
  @IsNumber()
  pos:number

}