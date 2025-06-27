import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class  LoginDTO {

   @ApiProperty({ example: 'test@mail.com', description: 'Почта пользователя' })
   @IsString()
   email:string

   @ApiProperty({ example: '123456', description: 'Пароль пользователя' })
   @IsString()
   password:string
}