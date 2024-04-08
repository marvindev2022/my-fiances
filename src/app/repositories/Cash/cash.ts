import { Cash } from "@domain/Cash/cash";


export abstract class CashRepository {
  abstract createCash(cash: Cash): Promise<string>;

  abstract findCashById(cashId: string): Promise<Cash>;

  abstract findCashByUserId(userId: string): Promise<Cash>;

  abstract updateCash(cash: Cash): Promise<void>;

  abstract deleteCash(cashId: string): Promise<void>;
}