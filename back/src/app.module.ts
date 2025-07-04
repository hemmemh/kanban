import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BadgeSchema } from './schemas/badge.schema';
import { UserSchema } from './schemas/user.schema';
import { BoardSchema } from './schemas/board.schema';
import { CardSchema } from './schemas/card.schema';
import { ListSchema } from './schemas/list.schema';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { BoardModule } from './modules/board/board.module';
import { ListModule } from './modules/list/list.module';
import { CardModule } from './modules/card/card.module';
import { BadgeModule } from './modules/badge/badge.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.ENV === 'production' ? '.env.production' : '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // папка с изображениями и другими статикой
      serveRoot: '/static', // префикс URL (опционально)
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRESQL_HOST'),
        port: configService.get<number>('POSTGRESQL_PORT', 5432),
        username: configService.get<string>('POSTGRESQL_USER'),
        password: configService.get<string>('POSTGRESQL_PASS'),
        database: configService.get<string>('POSTGRESQL_DB'),
        entities: [BadgeSchema, BoardSchema, CardSchema, ListSchema, UserSchema],
        synchronize: true,
      }),
    }),
    AuthModule,
    UserModule,
    ListModule,
    CardModule,
    BadgeModule,
    BoardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
