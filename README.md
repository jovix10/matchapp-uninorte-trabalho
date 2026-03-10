🚀 Projeto MatchApp - Uninorte
👤 Identificação
Acadêmico: João Vitor de Matos Ferreira

Curso: Sistemas de Informação

Disciplina: Sistemas Distribuidos

🛠️ Requisitos Implementados
Autenticação Completa:

Fluxo de Cadastro, Login e Logout funcional em sistema SPA.

Envio de E-mail com Fila (Queue):

Os e-mails de boas-vindas não são enviados na hora.

Regra: Processamento automático a cada 30 segundos via setInterval.

Integração com a API Mailtrap do professor.

Chat em Tempo Real:

Comunicação bidirecional utilizando WebSockets (Socket.io).

Mensagens instantâneas com distinção visual (Enviadas/Recebidas).

💻 Como Rodar o Trabalho
Instalar dependências:

Bash
npm install
Iniciar o servidor:

Bash
node server.js
Acessar no navegador:
http://localhost:3000

📝 Notas de Teste
Ao realizar um cadastro, acompanhe o Terminal do VS Code.

O log [FILA] adicionado aparecerá imediatamente.

Exatamente 30 segundos depois, o log [SUCESSO] confirmará o disparo para o Mailtrap.
