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

*Posicione aqui os diagramas de modelos relacionais do seu banco de dados, apresentando todos os esquemas de tabelas e suas relações. Utilize texto para complementar suas explicações, se necessário.* <br>

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

*Posicione também o modelo físico com o Schema do BD (arquivo .sql)*

### 3.1.1 BD e Models (Semana 5)
*Descreva aqui os Models implementados no sistema web*

### 3.2. Arquitetura (Semana 5)

*Posicione aqui o diagrama de arquitetura da sua solução de aplicação web. Atualize sempre que necessário.*

**Instruções para criação do diagrama de arquitetura**  
- **Model**: A camada que lida com a lógica de negócios e interage com o banco de dados.
- **View**: A camada responsável pela interface de usuário.
- **Controller**: A camada que recebe as requisições, processa as ações e atualiza o modelo e a visualização.
  
*Adicione as setas e explicações sobre como os dados fluem entre o Model, Controller e View.*

### 3.3. Wireframes (Semana 03)

*Posicione aqui as imagens do wireframe construído para sua solução e, opcionalmente, o link para acesso (mantenha o link sempre público para visualização).*

### 3.4. Guia de estilos (Semana 05)

*Descreva aqui orientações gerais para o leitor sobre como utilizar os componentes do guia de estilos de sua solução.*


### 3.5. Protótipo de alta fidelidade (Semana 05)

*Posicione aqui algumas imagens demonstrativas de seu protótipo de alta fidelidade e o link para acesso ao protótipo completo (mantenha o link sempre público para visualização).*

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