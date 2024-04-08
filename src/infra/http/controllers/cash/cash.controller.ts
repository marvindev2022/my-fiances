import { IAddCashDTO } from '@infra/http/dtos/Cash/addCash.dto';
import { CashService } from '@infra/http/services/cash/cash.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('dinheiro')
export class CashController {
  constructor(private cashService: CashService, ) {}

  @Post('depositar')
  async deposit(@Body() depositDTO: IAddCashDTO) {
    const deposit = await this.cashService.createCash(depositDTO);
    if (deposit instanceof Error) throw new Error(deposit.message);
    return { message: 'Depósito realizado com sucesso!' };
  }

  @Post('sacar')
  async withdraw(@Body() withdrawDTO: IAddCashDTO) {
    const withdraw = await this.cashService.createCash(withdrawDTO);
    if (withdraw instanceof Error) throw new Error(withdraw.message);
    return { message: 'Saque realizado com sucesso!' };
  }

  @Get('saldo/:userId')
  async getBalance(@Param('userId') userId: string) {
    const balance = await this.cashService.getCashByUserId(userId);
    return balance;
  }

  @Get(':id')
  async getCashById(@Param('id') id: string) {
    const cash = await this.cashService.getCashById(id);
    return cash;
  }

  @Post('editar')
  async updateCash(@Body() updateDTO: IAddCashDTO) {
    const update = await this.cashService.updateCash(updateDTO);
    if (update instanceof Error) throw new Error(update.message);
    return { message: 'Edição realizada com sucesso!' };
  }
}
