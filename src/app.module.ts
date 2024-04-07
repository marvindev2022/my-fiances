import { Module } from '@nestjs/common';
import { DatabaseModule } from '@infra/database/database.module';
import { HttpModule } from '@infra/http/http.module';
import { ConfigModule } from '@nestjs/config';
import { BullConfigModule } from './infra/config/bull.module';
import { MailerConfigModule } from './infra/config/mailer.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullConfigModule,
    MailerConfigModule,
    HttpModule,
    DatabaseModule,
    MulterModule.register({
      dest: 'uploads/',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
