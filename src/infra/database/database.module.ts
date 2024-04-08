import { Module } from '@nestjs/common';
import { UsersDatabaseModule } from './prisma/repositories/User/prisma-user-database.module';
import { CashDatabaseModule } from './prisma/repositories/Cash/prisma-cash-database.module';

@Module({
  imports: [UsersDatabaseModule,CashDatabaseModule],
})
export class DatabaseModule {}
