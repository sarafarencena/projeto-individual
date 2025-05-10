# InteliRooms | Projeto Individual M2
O **InteliRooms** é um sistema em desenvolvimento que visa otimizar a reserva de salas para os alunos do Inteli (Instituto de Tecnologia e Liderança), permitindo consulta direta a disponibilidade de salas e horários, além de agendar, alterar e cancelar reservas.

---

## Estrutura de Pastas (MVC)
```
projeto-individual/
│
├── config/                # Arquivos de configuração do banco
│   └── database.js
├── controllers/           # Lógica de controle das requisições
│   └── HomeController.js
├── models/                # Definição de modelos de dados (estrutura do banco)
│   └── User.js
├── routes/                # Definição das rotas do sistema
│   └── index.js
├── services/              # Serviços auxiliares do sistema
│   └── userService.js
├── assets/                # Arquivos públicos como imagens e fontes
├── scripts/               # Arquivos de JavaScript públicos
├── styles/                # Arquivos CSS públicos
├── tests/                 # Arquivos de testes unitários
│   └── example.test.js
├── .gitignore             # Arquivo para ignorar arquivos no Git
├── .env                   # Arquivo de variáveis de ambiente
├── jest.config.js         # Arquivo de configuração do Jest
├── package-lock.json      # Gerenciador de dependências do Node.js
├── package.json           # Gerenciador de dependências do Node.js
├── readme.md              # Documentação do projeto (Markdown)
├── server.js              # Arquivo principal que inicializa o servidor
└── rest.http              # Teste de endpoints
```

---

## Como executar o projeto localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/)
- Banco de dados PostgreSQL ou Supabase
- Um terminal compatível com comandos `npm`

### Passo a passo

#### 1. Utilize uma IDE (ex: VS Code)

#### 2. Clone o repositório:

```bash
   git clone https://github.com/sarafarencena/projeto-individual
   cd projeto-individual
```

#### 3. Instale as dependências:
No terminal (ctrl + j):

```bash
npm install
```

#### 4. Inicie o servidor:
```bash
npm start
```
ou
```bash
node server.js
```

Acesse o servidor via
```arduino
http://localhost:3000
```

---

## Licença
Esse projeto está sendo desenvolvido por [Sara Sbardelotto](https://br.linkedin.com/in/sara-sbardelotto/pt), aluna do 1° ano de Engenharia da Computação no Inteli.