import { Module } from '@nestjs/common';
import { UsersModule } from './controllers/users/user.module';
import { MailQueueModule } from './controllers/mail/mail.module';
import { ImagesModule } from './controllers/images/images.module';
import { CashModule } from './controllers/cash/cash.module';
import { SupabaseModule } from '@infra/supaBase/sb.module';
@Module({
  imports: [
    UsersModule,
    MailQueueModule,
    ImagesModule,
    CashModule,
    SupabaseModule
  ],
})
export class HttpModule {}
