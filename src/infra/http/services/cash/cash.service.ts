import { CashRepository } from '@app/repositories/Cash/cash';
import { Cash } from '@domain/Cash/cash';
import { IAddCashDTO } from '@infra/http/dtos/Cash/addCash.dto';
import { UpdateCashDTO } from '@infra/http/dtos/Cash/editCash.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CashService {
  constructor(private cashRepository: CashRepository) {}

  async createCash(cash: IAddCashDTO): Promise<any> {
    const newCash = new Cash(cash);
    await this.cashRepository.createCash(newCash);
    return newCash;
  }

  async getCashById(id: string): Promise<any> {
    const cash = await this.cashRepository.findCashById(id);
    return cash;
  }

  async getCashByUserId(userId: string): Promise<Cash> {
    const cash = await this.cashRepository.findCashByUserId(userId);
    return cash;
  }

  async updateCash(cash: UpdateCashDTO): Promise<any> {
    const updatedCash = new Cash({
      amount: cash.amount!,
      userId: cash.userId!,
    });
    await this.cashRepository.updateCash(updatedCash);
    return updatedCash;
  }

  async deleteCash(id: string): Promise<any> {
    await this.cashRepository.deleteCash(id);
  }
}
