const nodemailer = require("nodemailer");

class MailSendPassword {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendPasswordMail(to, password) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Восстановление пароля " + process.env.API_URL,
      text: "",
      html: ` 
                    <div>
        <p>
          Вы или другой пользователь направили запрос на восстановление пароля к
          аккаунту
          <p style={{ textDecoration: "underline", color: "blue" }}>${to}</p>
        </p>
        <br style={{ marginTop: "15px" }} />
        
        <p>Ваш временный пароль:
          <p style={{ color: "#00a046", fontSize: "21px", fontWeight: "700" }}>${password}</p>
        </p>

        <br style={{ marginTop: "15px" }} />
        <p>
          Чтобы изменить пароль и восстановить доступ к аккаунту, введите новый
          пароль в личном кабинете.
        </p>
        
        <br style={{ marginTop: "15px" }} />
        <p>
          Временный пароль и ссылка для восстановления пароля одноразовые и
          действуют в течение 12 часов с момента получения этого письма.
          Воспользуйтесь ими или введите новый пароль в личном кабинете.
        </p>
        
        <br style={{ marginTop: "15px" }} />
        <p>
          Если вы не посылали запрос на восстановление пароля, просто
          игнорируйте это письмо. Ваш пароль остается неизменным.
        </p>
      </div>
                `,
    });
  }
}

module.exports = new MailSendPassword();
