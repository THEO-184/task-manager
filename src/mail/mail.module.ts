import { Global, Module } from '@nestjs/common';
import { EMailService } from './mail.service';

@Global()
@Module({
  providers: [EMailService],
  exports: [EMailService],
})
export class MailModule {}
