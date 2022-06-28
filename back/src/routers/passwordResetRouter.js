import { Router } from "express";
import path from "path";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import { userAuthService } from "../services/userService";

dotenv.config();

const passwordResetRouter = Router();

// POST /password-reset : 임시 비밀번호 발급 후(user data에 반영) 이메일 전송
passwordResetRouter.post("/password-reset", 
  async (req, res, next) => {
    try {
        const tempPassword = Math.random().toString(36).slice(2);
        const { name, email } = req.body;
        const user = await userAuthService.resetPassword({ email, tempPassword })
        
        if (user.errorMessage) {
            throw new Error(user.errorMessage);
        }
        
        const smtpTransport = nodemailer.createTransport({
            service: "Naver",
            auth: {
              user: process.env.SMTP_AUTH_USER,
              pass: process.env.SMTP_AUTH_PASSWORD
            },
            tls: {
              rejectUnauthorized: false
            }
        });
        // 이메일 템플릿 경로 : /back/src/templates/index.handlebars
        const view_path = path.join(__dirname, "..", "templates");

        smtpTransport.use('compile', hbs({
            viewEngine: {
            defaultLayout: false,
            extName: ".handlebars"
            },
            viewPath: view_path,
        }))
    
        const mailOptions = {
            from: "전지적 개발자 시점 <example@naver.com>",
            to: email,
            subject: "전지적 개발자 시점 임시 비밀번호 발급",
            template: "index",
            attachments: [{
                filename: 'logo.png',
                path: __dirname +'/logo.png',
                cid: 'logo'
            }],
            context: {
                name,
                tempPassword,
            }
        };
    
        smtpTransport.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
                throw new Error("이메일 전송에 실패했습니다. 다시 시도해 주세요.");
            } 
            smtpTransport.close();
        });

        res.status(200).json({ message: "success"})
    } catch (e) {
        next(e);
    }
});

export { passwordResetRouter };
