import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('kanban')
    .setDescription('kanban API description')
    .setVersion('1.0')
    .addTag('users', 'Операции с пользователями')
    .addTag('boards', 'Операции с досками')
    .addTag('lists', 'Операции с колонками')
    .addTag('cards', 'Операции с карточками')
    .addBearerAuth()
    .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
