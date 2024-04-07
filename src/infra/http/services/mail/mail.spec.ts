import { recoveryPasswordTemplate } from '@app/email-templates/recovery-password-template';
import { PasswordRecoveryMailDTO } from '@infra/http/dtos/User/passwordRecovery.dto';
import { MailProcessorService } from './mail.service';

describe('MailProcessorService', () => {
  
  class MailerServiceMock {
    sendMail = jest.fn();
  }

  
  let mailProcessorService: MailProcessorService;
  let mailerService: MailerServiceMock;

  beforeEach(() => {
    mailerService = new MailerServiceMock();
    mailProcessorService = new MailProcessorService(mailerService as any);
  });

  it('should send a mail', () => {
    
    const mailData: PasswordRecoveryMailDTO = {
      email: 'test@example.com',
      recoveryLink: 'https://example.com/reset-password',
    };

    
    const jobMock: any = {
      data: mailData,
    };

    
    mailProcessorService.sendMailJob(jobMock);

    
    expect(mailerService.sendMail).toHaveBeenCalledWith({
      from: expect.any(String), 
      to: mailData.email,
      subject: 'Redefinição de senha',
      date: expect.any(Date), 
      html: recoveryPasswordTemplate(mailData.recoveryLink), 
    });
  });

  it('should log email being sent', () => {
    const result = mailProcessorService.logEmailBeeingSent();
    expect(result).toEqual('O E-mail está sendo enviado');
  });

  it('should log email sent', () => {
    const result = mailProcessorService.logEmailSended();
    expect(result).toEqual('O E-mail foi enviado!');
  });
});
