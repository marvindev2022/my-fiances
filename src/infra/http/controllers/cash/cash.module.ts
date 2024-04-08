import { PrismaService } from '@infra/database/prisma/prisma.service';
import { CashDatabaseModule } from '@infra/database/prisma/repositories/Cash/prisma-cash-database.module';
import { ValidateToken } from '@infra/http/middlewares/users/validateToken';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CashController } from './cash.controller';
import { CashService } from '@infra/http/services/cash/cash.service';

@Module({
  imports: [CashDatabaseModule],
  controllers: [CashController],
  providers: [CashService, PrismaService],
})
export class CashModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateToken)
      .exclude({
        path: '/cash/:id',
        method: RequestMethod.GET,
      })
      .forRoutes(
        { path: '/cash', method: RequestMethod.POST },
        { path: '/cash', method: RequestMethod.PUT },
        { path: '/cash', method: RequestMethod.DELETE },
      );
  }
}
