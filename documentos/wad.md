# Web Application Document - Projeto Individual - Módulo 2 - Inteli

## InteliRooms

### <a href="https://br.linkedin.com/in/sara-sbardelotto/pt">Sara Sbardelotto</a>

## Sumário

1. [Introdução](#c1)  
2. [Visão Geral da Aplicação Web](#c2)  
3. [Projeto Técnico da Aplicação Web](#c3)  
4. [Desenvolvimento da Aplicação Web](#c4)  
5. [Referências](#c5)  

<br>

## <a name="c1"></a>1. Introdução

Atualmente, o sistema de reserva de salas do Inteli (Instituto de Tecnologia e Liderança) ocorre de modo presencial por meio da recepção. Entretanto, essa abordagem limita a autonomia dos alunos e gera frustrações, principalmente em períodos de alta demanda. <br>

O projeto InteliRooms visa desenvolver uma aplicação web que permita aos próprios usuários, especialmente alunos, consultarem a disponibilidade de salas e realizarem, editarem e cancelarem agendamentos, seguindo as regras institucionais preestabelecidas. <br>

Portanto, o foco do sistema é na experiência do usuário, para que eles tenham fácil acesso às principais funcionalidades de forma prática, como: visualização de horários e salas disponíveis, reserva com validação automática de acordo com as restrições e controle de agendamentos realizados. <br>

Assim, alunos como a Giulia Fachinelli, persona do projeto, terão sua demanda por um sistema de agendamentos mais prático, organizado e autônomo atendida, colaborando para sua gestão de tempo e organização pessoal para o uso de espaços compartilhados do Inteli.

---

## <a name="c2"></a>2. Visão Geral da Aplicação Web

### 2.1. Personas

A persona Giulia Fachinelli foi criada para representar os principais empecilhos enfretados pelos alunos do Inteli atrelados a reserva de salas de estudos da faculdade, permitindo um embasamento sólido para desenvolver o sistema InteliRooms de modo a atender as necessidades dos estudantes.

<div align="center">
<sub>Figura 1 - Persona</sub>
</div>

<img src="../assets/assets_WAD/personaGiulia.png">

<div align="center">
</div>

<div align="center">
<sub>Fonte: Template disponível em Canva, adaptado por Sara Sbardelotto (2025)</sub>
</div>

### 2.2. User Stories

> US01 | Como estudante do Inteli, quero consultar os horários e as salas disponíveis para reserva, para que eu possa planejar meus agendamentos.

> US02 | Como estudante do Inteli, quero reservar uma sala por até 1 hora, respeitando as restrições da minha turma e grupo, para que minha reserva seja válida e sem conflitos.

> US03 | Como estudante do Inteli, quero cancelar ou alterar uma reserva feita, para que eu possa ajustar minha agenda e liberar a sala para outras pessoas.

Análise da US02 com base nos critérios **INVEST**:
- **I** – Independente: é possível implementar a consulta de horários/salas disponíveis separadamente das funcionalidades de reserva, alteração e cancelamento de reservas.
- **N** – Negociável: o formato do sistema (lista ou calendário) pode ser ajustado conforme as necessidades do projeto.
- **V** – Valiosa: garante a organização e autonomia para o planejamento do estudante.
- **E** – Estimável: o esforço para o desenvolvimento dessa funcionalidade pode ser estimado em relação ao backend, consulta ao banco de dados, frontend, exibição das informações, e integração, conexão entre ambos.
- **S** – Pequena (Small): está limitada a consultar apenas dados (salas e horários) predeterminados.
- **T** – Testável: permite testar se o sistema exibe corretamente as salas e os horários disponíveis.

---

## <a name="c3"></a>3. Projeto da Aplicação Web

### 3.1. Modelagem do banco de dados  (Semana 3)

### Modelo Relacional
O modelo relacional desenvolvido para o **InteliRooms** busca representar os alunos, as salas disponíveis e as reservas realizados. Cada entidade possui atributos que ajudam no controle de permissões.

<div align="center">
<sub>Figura 2 - Modelo Relacional </sub>
</div>

<img src="../assets/assets_WAD/InteliRooms.png">

<div align="center">
</div>

<div align="center">
<sub>Fonte: Autoria própria, criado com dbdiagram.io (2025)</sub>
</div>
<br>

* **Usuários** (users): representa os alunos do Inteli, principais usuários do sistema.

* **Salas** (rooms): representas as salas disponíveis para reserva de acordo com as regras institucionais.

* **Reservas** (bookings): representa as reservas realizadas pelo usuário.

### Modelo Físico
A seguir, é possível visualizar a estrutura das tabelas e suas relações em SQL:

```sql
CREATE TABLE IF NOT EXISTS "users" (
  "id" int PRIMARY KEY,
  "name" varchar,
  "class" varchar,
  "course" varchar,
  "group" varchar,
  "role" varchar,
  "email" varchar,
  "created_at" timestamp
);

CREATE TABLE IF NOT EXISTS "rooms" (
  "id" int PRIMARY KEY,
  "id_user" int,
  "name" varchar,
  "floor" varchar
);

CREATE TABLE IF NOT EXISTS "bookings" (
  "id" int PRIMARY KEY,
  "id_room" int,
  "id_user" int,
  "time" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

ALTER TABLE "rooms" ADD FOREIGN KEY ("id_user") REFERENCES "users" ("id");

ALTER TABLE "bookings" ADD FOREIGN KEY ("id_room") REFERENCES "rooms" ("id");

ALTER TABLE "bookings" ADD FOREIGN KEY ("id_user") REFERENCES "rooms" ("id");
```

### Relacionamentos e Cardinalidade
**Usuários <-> Salas**
* Cada sala pode ter uma reserva por usuário (FK: is_user), relação 1:N.

**Usuários  <-> Agendamentos**
* Cada agendamento pertence a um usuário, relação 1:N.


### 3.1.1 BD e Models
#### Banco de Dados
Para que o sistema funcione corretamente, é necessário configurar a conexão com o banco de dados PostgreSQL e com o Supabase (utilizado para autenticação). Esta seção apresenta os trechos de código responsáveis por essas conexões e orientações sobre como definir as variáveis de ambiente necessárias.

A **conexão** com o **banco de dados PostgreSQL** é realizada utilizando o pacote `pg`.

```js
const { Pool } = require('pg');
require('dotenv').config();

const isSSL = process.env.DB_SSL === 'true';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: isSSL ? { rejectUnauthorized: false } : false,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  connect: () => pool.connect(),
};
```

Crie um arquivo `.env` contendo as seguintes variáveis:
```js
DB_USER=
DB_HOST=
DB_DATABASE=
DB_PASSWORD=
DB_PORT=
DB_SSL=
PORT=
```

**Conexão com o Supabase**

O Supabase é utilizado para **autenticação de usuários**. Abaixo está o código para configurar a conexão com o serviço, também utilizando variáveis de ambiente:
```js
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}
const supabase = createClient(supabaseUrl, supabaseKey);
module.exports = supabase;
```

Adicione as variáveis necessárias no arquivo `.env`:
```js
SUPABASE_URL=
SUPABASE_ANON_KEY=
```

#### Models
Esta seção descreve os **models** implementados no sistema web, responsáveis pela **comunicação com o banco de dados PostgreSQL**. Cada model representa uma entidade do sistema, com métodos que executam as operações básicas (CRUD).

---

#### `User` Model
Gerencia as informações dos usuários do sistema, como nome, e-mail e id.

#### Campos da Tabela `users`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | UUID | Identificador único do usuário |
| `name` | TEXT | Nome completo do usuário |
| `email` | TEXT | E-mail do usuário |

#### Métodos Disponíveis

| Método | Query SQL | Descrição |
|--------|-----------|-----------|
| `getAllUsers()` | `SELECT * FROM users` | Retorna todos os usuários |
| `getUserById(id)` | `SELECT * FROM users WHERE id = $1` | Retorna um usuário pelo ID |
| `createUser(data)` | `INSERT INTO users (...) VALUES (...) RETURNING *` | Cria um novo usuário |
| `update(id, data)` | `UPDATE users SET ... WHERE id = $3 RETURNING *` | Atualiza informações de um usuário |
| `delete(id)` | `DELETE FROM users WHERE id = $1 RETURNING *` | Remove um usuário do sistema |

---

#### `Room` Model
Gerencia o cadastro de salas disponíveis para reserva.

#### Campos da Tabela `rooms`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | UUID | Identificador único da sala |
| `id_user` | UUID | ID do usuário responsável pela reserva da sala |
| `name` | TEXT | Nome da sala |
| `floor` | INT | Andar onde a sala está localizada |

#### Métodos Disponíveis

| Método | Query SQL | Descrição |
|--------|-----------|-----------|
| `getAll()` | `SELECT * FROM rooms` | Lista todas as salas |
| `getById(id)` | `SELECT * FROM rooms WHERE id = $1` | Retorna uma sala pelo ID |
| `create(data)` | `INSERT INTO rooms (...) VALUES (...) RETURNING *` | Cria uma nova sala |
| `update(id, data)` | `UPDATE rooms SET ... WHERE id = $4 RETURNING *` | Atualiza os dados da sala |
| `delete(id)` | `DELETE FROM rooms WHERE id = $1 RETURNING *` | Remove uma sala do sistema |

---

### `Booking` Model
Controla as reservas feitas por usuários para uma determinada sala e horário.

#### Campos da Tabela `bookings`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | UUID | Identificador único da reserva |
| `id_user` | UUID | ID do usuário que realizou a reserva |
| `id_room` | UUID | ID da sala reservada |
| `time` | TIMESTAMP | Horário da reserva |
| `updated_at` | TIMESTAMP | (opcional) Data da última atualização |

#### Métodos Disponíveis

| Método | Query SQL | Descrição |
|--------|-----------|-----------|
| `getAll()` | `SELECT * FROM bookings` | Lista todas as reservas |
| `getById(id)` | `SELECT * FROM bookings WHERE id = $1` | Retorna uma reserva pelo ID |
| `create(data)` | `INSERT INTO bookings (...) VALUES (...) RETURNING *` | Cria uma nova reserva |
| `update(id, data)` | `UPDATE bookings SET ... updated_at = CURRENT_TIMESTAMP ...` | Atualiza uma reserva existente |
| `delete(id)` | `DELETE FROM bookings WHERE id = $1 RETURNING *` | Remove uma reserva do sistema |

---

- Os models implementados executam diretamente queries SQL com parâmetros.
- A conexão com o banco de dados é gerenciada pelo módulo `db` (`db.query(...)`).
- O uso de `RETURNING *` permite que o sistema obtenha o objeto recém-criado ou atualizado diretamente do banco de dados.

### 3.2. Arquitetura
O diagrama a seguir representa a arquitetura da aplicação **InteliRooms**, estruturada segundo o padrão **MVC** (Model-View-Controller). Este padrão foi escolhido para garantir organização, escalabilidade e separação de responsabilidades entre as diferentes camadas da aplicação.

<div align="center">

<sub> Figura 3 - Diagrama Arquitetura MVC </sub>
</div>


```mermaid
flowchart LR
 subgraph LoginView["Login Page"]
        LoginComponents["• Login Form<br>"]
  end
 subgraph SignupView["Signup Page"]
        SignupComponents["• Registration Form<br>"]
  end
 subgraph BookingsView["Bookings Page"]
        BookingsComponents["• Rooms<br>• Booking Form<br>• User Dashboard"]
  end
 subgraph Views["📄Views"]
    direction TB
        LoginView
        SignupView
        BookingsView
  end
 subgraph AuthController["AuthController"]
        AuthMethods["• signup<br>• signin<br>• signout<br>• getCurrentUser<br>• refreshToken"]
  end
 subgraph BookingController["BookingController"]
        BookingMethods["• getAll<br>• getById<br>• create<br>• update<br>• delete"]
  end
 subgraph RoomController["RoomController"]
        RoomMethods["• getAll<br>• getById<br>• create<br>• update<br>• delete"]
  end
 subgraph UserController["UserController"]
        UserMethods["• getAll<br>• getById<br>• create<br>• update<br>• delete"]
  end
 subgraph Controllers["🎮 Controllers"]
    direction TB
        AuthController
        BookingController
        RoomController
        UserController
  end
 subgraph UserModel["Users"]
        UserFields["• id<br>• name<br>• class<br>• course<br>• group<br>• role<br>• email<br>• createdAt"]
  end
 subgraph RoomModel["Rooms"]
        RoomFields["• id<br>• idUser<br>• name<br>• floor"]
  end
 subgraph BookingModel["Bookings"]
        BookingFields["• id<br>• idRoom<br>• idUser<br>• time<br>• createdAt<br>• updatedAt"]
  end
 subgraph Models["📊 Models"]
    direction TB
        UserModel
        RoomModel
        BookingModel
  end
    Browser["🌐 Browser/Client"] <--> Views
    Views --> Controllers
    Controllers --> Models
    Models --> Database["🗄️ Database"]
    AuthController --> UserModel
    UserController --> UserModel
    RoomController --> RoomModel
    BookingController --> BookingModel
    LoginView --> AuthController
    SignupView --> AuthController
    BookingsView --> BookingController & RoomController & UserController
    BookingModel --> UserModel & RoomModel
     Browser:::browserBox
     Views:::viewBox
     Controllers:::controllerBox
     Models:::modelBox
     Database:::databaseBox
    style LoginComponents stroke:#616161
    style SignupComponents stroke:#616161
    style BookingsComponents stroke:#616161
    style LoginView stroke:#616161
    style SignupView stroke:#616161
    style BookingsView stroke:#616161
    style AuthMethods stroke:#616161
    style BookingMethods stroke:#616161
    style RoomMethods stroke:#616161
    style UserMethods stroke:#616161
    style AuthController stroke:#616161
    style BookingController stroke:#616161
    style RoomController stroke:#616161
    style UserController stroke:#616161
    style UserFields stroke:#616161
    style RoomFields stroke:#616161
    style BookingFields stroke:#616161
    style UserModel stroke:#616161
    style RoomModel stroke:#616161
    style BookingModel stroke:#616161
    style Browser stroke:#616161
    style Views stroke:#616161
    style Controllers stroke:#616161
    style Models stroke:#616161
    style Database stroke:#616161

```

<div align="center">
<sub> Fonte: Autoria própria, criado com Mermaid (2025) </sub>
</div>
<br>

- A **View** é responsável pela interface com o usuário, incluindo páginas como login, cadastro e visualização de reservas. Ela se comunica diretamente com os controllers ao receber ações do usuário.
- Os **Controllers** atuam como intermediários entre a View e os Models. Cada controller (como `AuthController`, `UserController`, `RoomController` e `BookingController`) é responsável por processar requisições específicas, a lógica de negócio e retornar as respostas adequadas.
- A camada de **Models** contém a lógica de negócio e os esquemas de dados que representam as entidades do sistema: usuários, salas e reservas. Essa camada interage diretamente com o banco de dados.
- Por fim, o **cliente** interage com a interface web, disparando ações que percorrem esse fluxo de comunicação entre camadas, até atingir o banco de dados e retornar a resposta apropriada.

### 3.3. Wireframes

A seguir, são apresentados os wireframes das principais funcionalidades, que se relacionam diretamente às User Stories (US).

#### Navegabilidade
Para atender os requisitos do projeto enquanto solução para a persona que representa os alunos do Inteli, foi desenvolvida a sequência de wireframes abaixo:

<div align="center">

<sub>Figura 4 - Wireframe Navegação entre Telas </sub>
</div>

<img src="../assets/assets_WAD/wireframeCompleto.jpg">

<div align="center">
</div>

<div align="center">
<sub>Fonte: Autoria própria (2025)</sub>
</div>
<br>

Nesse wireframe, a tela principal será acessada na Adalove, plataforma utilizada pelos estudantes do Inteli, por meio de um widget no header, permitindo que os alunos selecionem um horário disponível da sala que desejam reservar. Assim, serão direcionados à uma tela de confirmação, que quando realizada a reserva, os redirecionam à tela principal de visualizaçao da disponibilidade de salas. Além disso, também é permitido que o usuário altere ou cancele um agendamento feito na tela principal.

#### Tela Principal
A tela principal se relaciona diretamente com a **US01**, pois mostra as salas disponíveis para reserva, colaborando com o planejamento do(a) estudante. Nela, é possível visualizar as salas, que se encontram nas colunas, bem como os horários disponíveis nas linhas para reserva. 

<div align="center">

<sub>Figura 5 - Wireframe Tela Principal </sub>
</div>

<img src="../assets/assets_WAD/telaPrincipal.jpg">

<div align="center">
</div>

<div align="center">
<sub>Fonte: Autoria própria (2025)</sub>
</div>
<br>

Cada item dessa "matriz" é clicável e direciona o usuário para as telas que serão detalhadas a seguir. É similar ao Google Calendar, no qual as colunas representam os dias da semana, mas, neste caso, isso não se aplica, visto que as salas só podem ser reservadas para o dia em questão.

#### Tela de Reserva
A partir da tela principal, é possível selecionar um horário disponível na sala desejada, o que direciona o/a estudante para a tela de reserva, representada pelo wireframe do modal abaixo, permitindo que uma reserva seja feita sem conflitos, de acordo com a **US02**.

<div align="center">

<sub>Figura 6 - Wireframe Tela de Reserva </sub>
</div>

<img src="../assets/assets_WAD/telaReserva.jpg">

<div align="center">
</div>

<div align="center">
<sub>Fonte: Autoria própria (2025)</sub>
</div>
<br>

#### Tela de Cancelamento/Alteração
Por fim, também na tela principal, ao clicar na reserva realizada, o(a) estudante é direcionado(a) para um modal de cancelamento/alteração, apresentado no wireframe a seguir, que atende à necessidade da **US03**.

<div align="center">

<sub>Figura 7 - Wireframe Tela de Cancelamento/Alteração </sub>
</div>

<img src="../assets/assets_WAD/telaCancelarAlterar.jpg">

<div align="center">
</div>

<div align="center">
<sub>Fonte: Autoria própria (2025)</sub>
</div>
<br>

[Link complementar wireframe](https://drive.google.com/file/d/1gbPN1vG688K-E2yLvHXdORcSTWxpqRHO/view?usp=sharing)

### 3.4. Guia de estilos

O mini guia de estilos estabelece os padrões visuais da aplicação InteliRooms, desenvolvidos com base na identidade visual da Adalove. Como uma solução projetada visando uma futura integração à plataforma principal, o InteliRooms mantém coerência com o design system estabelecido, adaptando-o às necessidades específicas para reserva de salas.

O documento a seguir reúne os elementos fundamentais que garantem harmonia visual entre as aplicações, preservando a identidade da Adalove enquanto assegura que a identificação do usuário com o InteliRooms.

<div align="center">

<sub>Figura 8 - Mini Guia de Estilos </sub>
</div>

<img src="../assets/assets_WAD/mini-guia-estilos.png">

<div align="center">
</div>

<div align="center">
<sub>Fonte: Autoria própria (2025)</sub>
</div>
<br>

#### Orientações Gerais (uso do guia de estilos)
* **Consistência:** Todos os elementos devem seguir rigorosamente as especificações de cores, tipografia e componentes definidos neste guia para manter a coesão visual da plataforma.
* **Acessibilidade:** As combinações de cores foram testadas para garantir contraste adequado e legibilidade, atendendo aos padrões de acessibilidade web.
* **Hierarquia Visual:** Utiliza hierarquia tipográfica e cromática para guiar o usuário através da interface, destacando informações importantes e organizando o conteúdo de modo que textos de maior hierarquia com cores vibrantes se destaquem sobre aqueles de menor hierarquia com tons neutros.
  * Paleta de cores: marcada pelo contraste entre tons vibrantes e neutros, garantindo equilíbrio no destaque e na categorização de informações.
  * Tipografia: hierarquia tipográfica clara e moderna, garantindo legibilidade em diferentes contextos e dispositivos.
  * ícones: visual com traços vazados, que orientam o usuário a identificar facilmente as funcionalidades da aplicação.

Esse mini guia de estilos serve como referência fundamental para o desenvolvimento e manutenção da identidade visual do InteliRooms, garantindo uma experiência consistente e fluida para os usuários da plataforma.

Acesse aqui o [mini guia de estilos e layout da aplicação](https://www.figma.com/design/C2nASxGdM7WYo5goAXgZRp/Ponderada-3---Prot%C3%B3tipo-e-Guia-de-Estilos-Inteli-Rooms?node-id=72-9200&p=f&t=tCZpegu8CDgzw3oO-0).


### 3.5. Protótipo de alta fidelidade

O protótipo de alta fidelidade apresentado representa uma versão visual próxima a futura aplicação do InteliRooms, sistema de reservas de salas, integrando elementos de interface consistentes e uma experiência de usuário pensada a partir das necessidades específicas dos alunos, que foram mapeadas por meio da persona.

Apesar de desenvolvido com foco na futura integração com a plataforma Adalove para autenticação unificada, o protótipo contempla soluções intermediárias que garantem a funcionalidade completa do sistema enquanto respeita as restrições institucionais atuais. Dessa forma, o sistema poderá operar de forma independente até que a integração definitiva seja implementada, sem comprometer a experiência do usuário ou a aplicação das regras de negócio necessárias.

#### Tela de Login
A tela de login serve como ponto de entrada seguro para a aplicação. Embora o objetivo final seja a integração com a plataforma Adalove, esta tela o acesso dos usuários ao sistema de reservas, respeitando as restrições institucionais.

<div align="center">

<sub>Figura 9 - Tela de Login </sub>
</div>

<img src="../assets/assets_WAD/tela-login.png">

<div align="center">
</div>

<div align="center">
<sub>Fonte: Autoria própria (2025)</sub>
</div>
<br>

#### Tela de Cadastro (Signup)
Embora o objetivo final seja a integração com a plataforma Adalove, a tela de cadastro permite atualmente que novos usuários se registrem no sistema, coletando informações essenciais para aplicar as regras de negócio adequadas (restrições por turma, grupo e curso).

<div align="center">

<sub>Figura 10 - Tela de Sign-up </sub>
</div>

<img src="../assets/assets_WAD/tela-signup.png">

<div align="center">
</div>

<div align="center">
<sub>Fonte: Autoria própria (2025)</sub>
</div>
<br>

#### Tela Principal
A tela principal conta com uma matriz de salas e horários que permite visualização clara da disponibilidade e acesso direto às funcionalidades de reserva, alteração e cancelamento.

<div align="center">

<sub>Figura 11 - Tela Principal </sub>
</div>

<img src="../assets/assets_WAD/tela-principal.png">

<div align="center">
</div>

<div align="center">
<sub>Fonte: Autoria própria (2025)</sub>
</div>
<br>

A partir da tela principal, o usuário pode acessar tanto a tela de reserva, quanto a de cancelamento/alteração, demonstradas a seguir.

#### Tela de Reserva
A funcionalidade de reserva é implementada através de um modal (pop-up) que sobrepõe a tela principal. Este modal é ativado automaticamente quando o usuário clica em um slot de horário disponível na grade, apresentando de forma clara as informações da sala e horário selecionados para confirmação da reserva. O design modal mantém o contexto da grade principal visível ao fundo, proporcionando uma experiência fluida e intuitiva ao usuário.

<div align="center">

<sub>Figura 12 - Tela de Reserva </sub>
</div>

<img src="../assets/assets_WAD/tela-reservar.png">

<div align="center">
</div>

<div align="center">
<sub>Fonte: Autoria própria (2025)</sub>
</div>
<br>

#### Tela de Cancelamento/Alteração
O gerenciamento de reservas existentes é realizado através de um modal (pop-up) que sobrepõe a tela principal, ativado quando o usuário clica em uma reserva já realizada na grade de horários. Este modal apresenta os detalhes completos da reserva selecionada e oferece duas opções principais de ação: alterar o horário da reserva ou cancelá-la completamente. O design modal preserva a visibilidade da grade ao fundo, permitindo que o usuário mantenha o contexto de sua decisão.

<div align="center">

<sub>Figura 13 - Tela de Cancelameto/Alteração </sub>
</div>

<img src="../assets/assets_WAD/tela-cancelar-alterar.png">

<div align="center">
</div>

<div align="center">
<sub>Fonte: Autoria própria (2025)</sub>
</div>
<br>


Acesse aqui o link do [protótipo completo com navegabilidade](https://www.figma.com/design/C2nASxGdM7WYo5goAXgZRp/Ponderada-3---Prot%C3%B3tipo-e-Guia-de-Estilos-Inteli-Rooms?node-id=0-1&t=dMOCNcMjffRQwRqM-1).

### 3.6. WebAPI e endpoints (Semana 05)

*Utilize um link para outra página de documentação contendo a descrição completa de cada endpoint. Ou descreva aqui cada endpoint criado para seu sistema.*

### 3.7 Interface e Navegação (Semana 07)

*Descreva e ilustre aqui o desenvolvimento do frontend do sistema web, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

---

## <a name="c4"></a>4. Desenvolvimento da Aplicação Web (Semana 8)

### 4.1 Demonstração do Sistema Web (Semana 8)

*VIDEO: Insira o link do vídeo demonstrativo nesta seção*
*Descreva e ilustre aqui o desenvolvimento do sistema web completo, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

### 4.2 Conclusões e Trabalhos Futuros (Semana 8)

*Indique pontos fortes e pontos a melhorar de maneira geral.*
*Relacione também quaisquer outras ideias que você tenha para melhorias futuras.*



## <a name="c5"></a>5. Referências

_Incluir as principais referências de seu projeto, para que seu parceiro possa consultar caso ele se interessar em aprofundar. Um exemplo de referência de livro e de site:_<br>

---
---