import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class UpdateBoardDTO {

  @ApiProperty({ example: '1', description: 'ID доски' })
  @IsNumber()
  id:number

  @ApiProperty({ example: 'доска-обновлена', description: 'Новое имя доски' })
  @IsString()
  name:string
  
  @ApiProperty({ example: 'adw32-обновленное.jpeg', description: 'Имя изображения' })
  @IsString()
  image:string
}