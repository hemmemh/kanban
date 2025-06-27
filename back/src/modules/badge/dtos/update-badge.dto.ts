import { ApiProperty } from "@nestjs/swagger"


export class UpdateBadgeDTO {

  @ApiProperty({ example: '1', description: 'ID метки' })
  id:number

  @ApiProperty({ example: 'метка-1-обновлена', description: 'Имя метки' })
  name:string

  @ApiProperty({ example: '#f2f', description: 'Цвет метки' })
  color:string



}