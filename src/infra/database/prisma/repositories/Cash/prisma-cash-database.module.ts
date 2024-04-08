import { Module } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import { CashRepository } from "@app/repositories/Cash/cash";
import { PrismaCashRepository } from "./prisma-cash-repository";


@Module({
    providers: [
        PrismaService,
        {provide: CashRepository, useClass: PrismaCashRepository}
    ],
    exports:[{provide: CashRepository, useClass: PrismaCashRepository}]
})
export class CashDatabaseModule {}