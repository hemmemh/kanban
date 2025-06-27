import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class CreateBoardDTO {

  @ApiProperty({ example: 'доска-1', description: 'Имя доски' })
  @IsString()
  name:string

  @ApiProperty({ example: '1', description: 'ID владельца' })
  @IsNumber()
  ownerId:number

  @ApiProperty({ example: 'adw32.jpeg', description: 'Имя изображения' })
  @IsString()
  image:string
}