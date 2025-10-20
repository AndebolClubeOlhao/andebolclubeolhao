
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import multer from "multer";
import fs from "fs";
dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// Servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname)));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
const upload = multer({
  dest: path.join(__dirname, "uploads/"),
  limits: { fileSize: 16 * 1024 * 1024 }, // 16MB
});

// Rota de envio de e-mail
app.post("/send-order", async (req, res) => {
  const { nome, email, atleta, descricao } = req.body;

  const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false, // STARTTLS
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});


  const mailOptions = {
    from: `"Formulário de Encomenda" <${process.env.SMTP_USER}>`,
    to: "geral@andebolclubeolhao.pt", // destino fixo
    subject: `Nova encomenda de ${nome}`,
    text: `
      Nome: ${nome}
      E-mail: ${email}
      Atleta/Pessoa: ${atleta}
      Descrição: ${descricao}
    `,
  };
  const mailOptions2 = {
    from: `"Formulário de Encomenda" <${process.env.SMTP_USER}>`,
    to: email, // destino fixo
    subject: `Encomenda de ${nome}`,
    text: `
    
    Nome: ${nome}
      E-mail: ${email}
      Atleta/Pessoa: ${atleta}
      Descrição: ${descricao}
    `,
  };
  

  try {
    await transporter.sendMail(mailOptions);
    messageBox.textContent = "✅ Enviado com sucesso! aguarde resposta";
    messageBox.style.color = "green";
  } catch (err) {
    console.error("Erro ao enviar e-mail:", err);
    res.status(500).send("Erro ao enviar o e-mail.");
  }
  try {
    await transporter.sendMail(mailOptions2);
    messageBox.textContent = "✅ Enviado com sucesso! aguarde resposta";
    messageBox.style.color = "green";
  } catch (err) {
    console.error("Erro ao enviar e-mail:", err);
    res.status(500).send("Erro ao enviar o e-mail.");
  }
});
app.post("/send-order1", upload.single("image"), async (req, res) => {
  try {
    const {
      name, bi, vatin,
      dob_day, dob_month, dob_year,
      gender, email, phone,
      address, postal_code, city,
      subregion, region, country, category
    } = req.body;

    // Configurar o Nodemailer
    const port = Number(process.env.SMTP_PORT);
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: port,
      secure: port === 465, // true para SSL/TLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      logger: true,
      debug: true,
    });

    // Preparar e-mail com anexos
    const mailOptions = {
      from: `"Formulário de Inscrição" <${process.env.SMTP_USER}>`,
      to: "geral@andebolclubeolhao.pt", // destino fixo
      subject: `Nova inscrição de ${name}`,
      text: `
Nome: ${name}
Documento: ${bi}
NIF: ${vatin}
Data de nascimento: ${dob_day}/${dob_month}/${dob_year}
Género: ${gender}
Email: ${email}
Telefone: ${phone}
Morada: ${address}, ${postal_code}, ${city}, ${subregion}, ${region}, ${country}
Categoria: ${category}
      `,
      attachments: req.file
        ? [
            {
              filename: req.file.originalname,
              path: req.file.path,
            },
          ]
        : [],
    };
    const mailOptions2 = {
    from: `"Inscrição" <${process.env.SMTP_USER}>`,
    to: email, // destino fixo
    subject: `Inscrição de ${name}`,
    text: `
      
    Olá, ${name}, agradecemos o seu contacto. Daremos resposta logo que possivel.
    `,
  };
  

  try {
    await transporter.sendMail(mailOptions2);
    res.status(200).send("Formulário enviado com sucesso!");
  } catch (err) {
    console.error("Erro ao enviar e-mail:", err);
    res.status(500).send("Erro ao enviar o e-mail.");
  }

    await transporter.sendMail(mailOptions);

    // Opcional: deletar arquivo após envio
    if (req.file) fs.unlinkSync(req.file.path);

    res.status(200).send("Formulário enviado com sucesso!");
  } catch (err) {
    console.error("Erro ao enviar e-mail:", err);
    res.status(500).send("Erro ao enviar o e-mail.");
  }
});
app.post("/send-order2", async (req, res) => {
  const { name, email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false, // STARTTLS
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});


  const mailOptions = {
    from: `"Formulário de contacto" <${process.env.SMTP_USER}>`,
    to: "geral@andebolclubeolhao.pt", // destino fixo
    subject: `Pedido de contacto ${name}`,
    text: `
      Nome: ${name}
      E-mail: ${email}
      Assunto: ${subject}
      Mensagem: ${message}
    `,
  };
  const mailOptions2 = {
    from: `"Formulário de contacto" <${process.env.SMTP_USER}>`,
    to: email, // destino fixo
    subject: `Pedido de contacto de ${name}`,
    text: `
      
    Olá, agradecemos o contacto.
    Recebemos a tua mensagem,  a qual mereceu a nossa melhor atenção.
    Iremos entrar em contato em breve
    `,
  };
  

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Formulário enviado com sucesso!");
  } catch (err) {
    console.error("Erro ao enviar e-mail:", err);
    res.status(500).send("Erro ao enviar o e-mail.");
  }
  try {
    await transporter.sendMail(mailOptions2);
    res.status(200).send("Formulário enviado com sucesso!");
  } catch (err) {
    console.error("Erro ao enviar e-mail:", err);
    res.status(500).send("Erro ao enviar o e-mail.");
  }
});



// Rota padrão → envia o index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));
