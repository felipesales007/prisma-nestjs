import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ScheduleService {
  private readonly logger = new Logger(ScheduleService.name);

  // @Cron('*/5 * * * * *')
  // @Interval(5000)
  @Cron(CronExpression.EVERY_10_SECONDS)
  cancelarPedidoSemPagamento() {
    //lógica para buscar e cancelar os pedidos.
    this.logger.debug(
      `Pedido de n: ${Math.floor(Math.random() * 120)} cancelado!`,
    );
  }
}
