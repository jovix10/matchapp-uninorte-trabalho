const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.static('public')); // Servirá o arquivo do item 2

const JWT_SECRET = 'token_de_seguranca_123';

// --- CONFIGURAÇÃO DA API DO SEU PROFESSOR (MAILTRAP) ---
const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "e2b69364b68216",
    pass: "03fbbed3fc64cc"
  }
});

// --- SISTEMA DE FILA ---
let emailQueue = [];

// Regra: Processar a cada 30 segundos
setInterval(async () => {
    if (emailQueue.length > 0) {
        console.log(`[FILA] Iniciando processamento de ${emailQueue.length} e-mail(s)...`);
        const batch = [...emailQueue];
        emailQueue = []; 

        for (const email of batch) {
            try {
                await transport.sendMail({
                    from: '"Sistema Acadêmico" <noreply@sistema.com>',
                    to: email,
                    subject: "Bem-vindo ao Sistema!",
                    text: "Cadastro realizado! Este e-mail foi enviado via fila de 30s."
                });
                console.log(`[SUCESSO] Enviado para: ${email}`);
            } catch (err) {
                console.error(`[ERRO] Falha no e-mail ${email}:`, err);
            }
        }
    }
}, 30000); // 30 segundos exatos

// --- ROTAS (Cadastro e Login) ---
app.post('/register', (req, res) => {
    const { email } = req.body;
    emailQueue.push(email); // Coloca na fila
    res.status(201).json({ message: "Registrado com sucesso!" });
});

app.post('/login', (req, res) => {
    const { email } = req.body;
    const token = jwt.sign({ user: email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ auth: true, token });
});

// --- CHAT (WebSocket) ---
io.on('connection', (socket) => {
    socket.on('chatMessage', (data) => {
        io.emit('message', data); // Envia em tempo real para todos
    });
});

server.listen(3000, () => {
    console.log('--- SERVIDOR ATIVO ---');
    console.log('Acesse: http://localhost:3000');
});