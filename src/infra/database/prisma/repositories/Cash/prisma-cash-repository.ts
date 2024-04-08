import { CashRepository } from '@app/repositories/Cash/cash';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Cash } from '@domain/Cash/cash';

@Injectable()
export class PrismaCashRepository implements CashRepository {
  constructor(private prismaService: PrismaService) {}

  async createCash(cash: Cash): Promise<string> {
    if (cash instanceof Error) {
      throw new BadRequestException(cash.message, {
        cause: cash,
        description: cash.stack,
      });
    }

    const { ...cashProps } = cash.props;
    const cashExists = await this.prismaService.cash.findUnique({
      where: {
        userId: cashProps.userId,
      },
    });
    if (cashExists) {
      await this.prismaService.cash.update({
        where: {
          userId: cashProps.userId,
        },
        data: {
          amount: cashProps.amount + cashExists.amount,
        },
      });

      return cashExists.id;
    } else {
      const { id } = await this.prismaService.cash.create({
        data: {
          amount: cashProps.amount,
          userId: cashProps.userId,
        },
        select: {
          id: true,
        },
      });
      return id;
    }
  }

  async findCashById(cashId: string): Promise<Cash> {
    const cash = await this.prismaService.cash.findUnique({
      where: {
        id: cashId,
      },
    });

    return cash as any;
  }

  async findCashByUserId(userId: string): Promise<any> {
    const cash = await this.prismaService.cash.findUnique({
      where: {
        userId,
      },
    });

    return cash;
  }

  async updateCash(cash: Cash): Promise<void> {
    const { id, ...cashProps } = cash.props;

    await this.prismaService.cash.update({
      where: {
        id,
      },
      data: {
        userId: cashProps.userId,
      },
    });
  }

  async deleteCash(cashId: string): Promise<void> {
    await this.prismaService.cash.delete({
      where: {
        id: cashId,
      },
    });
  }
}
