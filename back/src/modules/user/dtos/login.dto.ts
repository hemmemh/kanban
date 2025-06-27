import { ApiProperty } from "@nestjs/swagger"

export class  LoginDTO {

   @ApiProperty({ example: 'test@mail.com', description: 'Почта пользователя' })
   email:string
   
   @ApiProperty({ example: '123456', description: 'Пароль пользователя' })
   password:string
}