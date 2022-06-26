import { FRONTEND_APP } from "../../data/config";




const recoveryPassword = (destinatary:string, subject:string, token:string) => {

    return {
        destinatary: destinatary,
        subject: subject,
        bodyText: `Click on the link to change the password ${FRONTEND_APP}/auth/change-password/${token}`,
        bodyHtml: ''
    }
}


export {recoveryPassword};