import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(config.LISTEN_PORT, async () =>
    console.log(`Server running on ${await app.getUrl()}}`),
  );
}
bootstrap();
