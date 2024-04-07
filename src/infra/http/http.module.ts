import { Module } from '@nestjs/common';
import { UsersModule } from './controllers/users/user.module';
import { MailQueueModule } from './controllers/mail/mail.module';
import { ImagesModule } from './controllers/images/images.module';
@Module({
  imports: [
    UsersModule,
    MailQueueModule,
    ImagesModule,
  ],
})
export class HttpModule {}
