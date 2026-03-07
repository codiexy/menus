import nodemailer from 'nodemailer';
import { Options as SendMailOptions } from 'nodemailer/lib/mailer';
import { Options } from 'nodemailer/lib/smtp-connection';

interface MailOptions extends Options {
    service?: string | undefined;
    user?: string;
    pass?: string;
}

export default class Mail {

    mailer = nodemailer;

    mail;

    host = "smtp.gmail.com";

    port = 465;

    secure = true;

    service = 'Gmail';

    user = "";

    pass = "";

    constructor (options: MailOptions = {}) {
        const { 
            host = this.host, 
            port = this.port, 
            secure = this.secure, 
            service = this.service,
            user = this.user,
            pass = this.pass
        } = options;
        this.mail = this.mailer
            .createTransport({
                host,
                port,
                secure,
                service,
                auth: { user, pass },
            });
    }

    send = async (options: SendMailOptions) => {
        const info = await this.mail.sendMail(options);
        
        return info.response
    }
}