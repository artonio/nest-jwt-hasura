import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { GeneralExceptionFilter } from './filters/general-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalFilters(new GeneralExceptionFilter())

  const configService = app.get(ConfigService)
  const port = configService.get('PORT');

  await app.listen(port, () => {
    Logger.log(`Server is listening on http://localhost:${port}`)
  });
}
bootstrap();
