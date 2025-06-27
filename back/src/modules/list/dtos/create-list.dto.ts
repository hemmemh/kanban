import { ApiProperty } from "@nestjs/swagger"

export class CreateListDTO {

  @ApiProperty({ example: 'колонка-1', description: 'Имя колонки' })
  name:string

  @ApiProperty({ example: '#fff', description: 'Цвет колонки' })
  color:string

  @ApiProperty({ example: 0, description: 'Позиция колонки' })
  pos:number

  @ApiProperty({ example: 1, description: 'ID доски' })
  boardId:number

}