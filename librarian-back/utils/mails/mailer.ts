import {Transporter, createTransport} from 'nodemailer';


class Mailer {
    transporter:Transporter;
    appEmail:String;
    private static _instance:Mailer;

    private constructor(host:string, email:string, emailPassword:string, isSecure:boolean) {
        this.transporter = createTransport({
            host, // "smtp.gmail.com"
            port: isSecure? 465: 587,
            secure: isSecure? true: false,
            auth: {
              user: email,
              pass: emailPassword
            }
        });
    }

    public static instanciate(host:string, email:string, emailPassword:string, isSecure:boolean):Mailer{ 
       if (this._instance === undefined)
            this._instance = new Mailer(host, email, emailPassword, isSecure);
        return this._instance;
    }

    public static getInstance() {
        return this._instance;
    }

    public async send({destinatary, subject, bodyText, bodyHtml}:{destinatary:string, subject:string, bodyText:string, bodyHtml:string}):Promise<any> {
        const info = await this.transporter.sendMail({
            from: `Librarian App ${this.appEmail}`,
            to: destinatary,
            subject: subject,
            text: bodyText,
            html: bodyHtml
        });
        console.log("Message sent: %s", info.messageId);
        console.log(info);
        return info;
    }
}

export default Mailer; 