import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { EMailPayload } from './interfaces/mail.interfaces';

@Injectable()
export class EMailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(payload: EMailPayload) {
    this.mailerService.sendMail({
      ...payload,
      from: 'theophilusboakye47@gmail.com',
    });
  }
}
