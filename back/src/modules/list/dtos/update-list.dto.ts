import { ApiProperty } from "@nestjs/swagger"


export class UpdateListDTO {

  @ApiProperty({ example: '1', description: 'ID колонки' })
  id:number

  @ApiProperty({ example: 'колонка-1-обновлена', description: 'Имя колонки' })
  name:string

  @ApiProperty({ example: '#f2f', description: 'Цвет колонки' })
  color:string

  @ApiProperty({ example: 1, description: 'Позиция колонки' })
  pos:number

}