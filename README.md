# 💬 BaPo (Bate-Papo) - Real-Time Stranger Chat
O BaPo é uma plataforma de chat anônimo em tempo real que conecta usuários aleatórios ao redor do mundo. O projeto foi desenvolvido com foco em performance de rede, comunicação bidirecional e escalabilidade básica, utilizando tecnologias fundamentais para consolidar o domínio sobre a base do desenvolvimento web moderno.

## 🚀 Por que este projeto?
Este repositório faz parte do meu portfólio de estudos focado em fundamentos sólidos. Utilizei Vanilla JS, HTML e CSS (sem frameworks como React ou Next.js) para demonstrar proficiência em manipulação de DOM, gerenciamento de estados no cliente e protocolos de comunicação via WebSockets antes da abstração para bibliotecas de alto nível.

## 🛠️ Tecnologias e Conceitos Aplicados
- Backend: Node.js com Express para roteamento e gerenciamento de arquivos estáticos.
- Comunicação Real-Time: Socket.io para implementação de WebSockets, permitindo baixa latência na troca de mensagens.
- Lógica de Pareamento (Matching): Algoritmo de fila (Queue) baseado em eventos para conectar usuários disponíveis instantaneamente.
- Arquitetura: Estrutura modular de rotas e separação clara entre lógica de servidor e cliente.
- Containerização: Docker (Dockerfile e Docker Compose) para garantir que o ambiente de desenvolvimento seja idêntico ao de produção.
- Frontend Moderno: CSS Variabilizado com suporte nativo a Dark Mode via prefers-color-scheme e design responsivo.

## ⚙️ Como Rodar o Projeto
### Com Docker (Recomendado)
```Bash
# Clone o repositório
git clone https://github.com/paulocvieirajunior/bapo.git

# Entre na pasta
cd bapo

# Suba o container
docker-compose up -d
O servidor estará disponível em http://localhost:3000.
```

### Localmente
Certifique-se de ter o Node.js instalado.

```bash
npm install
npm run dev
```

## 🧠 Desafios Técnicos Resolvidos
1. Gerenciamento de Salas: Implementação de Map no servidor para rastrear em qual sala (room) cada socket.id está alocado, permitindo o encerramento correto da conexão quando um usuário sai.
2. UX em Tempo Real: Criação de estados visuais para "Aguardando usuário", "Conectado" e "Usuário desconectado", garantindo que a interface reaja imediatamente aos eventos do servidor.
3. Segurança Básica: Tratamento de strings e limites de caracteres para evitar sobrecarga no tráfego de dados.

## 📈 Próximos Passos
- [ ] Implementar chat por vídeo/áudio utilizando WebRTC.
- [ ] Adicionar sistema de denúncias para usuários mal-intencionados.
- [ ] Migrar para TypeScript para adicionar tipagem estática ao sistema de eventos.