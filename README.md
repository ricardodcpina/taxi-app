# Taxi-App - Teste técnico Shopper

Este é um teste técnico aplicado pela startup Shopper para vaga de desenvolvedor Web Full-stack.

O teste consiste em projetar e construir uma aplicação web full-stack no estilo dos apps Uber / 99 Taxi.

🔧 🏗️🏗️🏗️ ⚙️
Em construção...

## Lista de tarefas

21/11/2024 e 22/11/2024

### 1 - Geral

- Instalação de libs e frameworks ✔️
- Implementação do PostgresSQL via Prisma ✔️
- Popular banco de dados com motoristas ✔️
- Rastreamento e criação de erros ✔️
- Middleware de tratamento de erros ✔️

### 2 - Backend: Endpoint POST / ride / estimate

- Obter dados da requisição ✔️
- Validação de dados inseridos ✔️
- Integração com API Routes do Google ✔️
- Filtrar listagem de motoristas disponíveis ✔️
- Aplicar cálculo do valor das viagens ✔️
- Extração dos dados da API e do banco ✔️
- Formatar resposta do body com dados obtidos ✔️

### 3 - Backend: Endpoint PATCH / ride / confirm

- Obter dados da requisição ✔️
- Validação dos dados inseridos ✔️
- Validação via consulta ao banco ✔️
- Persistir viagem no banco de dados ✔️
- Formatar resposta do body com dados obtidos ✔️ 

### 4 - Backend: Endpoint GET / ride / {customer_id}?driver_id={id do motorista}

- Obter dados da requisição ✔️
- Validação dos dados inseridos ✔️
- Validação via consulta ao banco ✔️
- Obter viagens realizadas pelo usuário ✔️
- Aplicar filtro pelo id do motorista ✔️
- Formatar resposta do body com dados obtidos ✔️

22/11/2024 e 23/11/2024

### 5 - Frontend: Tela de Solicitação de Viagem

- Implementar formulário com campos necessários para requisição
- Implementar a requisição para a API
- Exibir tela de opções de viagem

### 6 - Frontend: Tela de Opções de Viagem

- Incluir mapa estático da rota calculada
- Listar opções de motoristas da viagem
- Redirecionar para tela de histórico

### 7 - Frontend: Tela de Histórico de ViageNS

- Incluir formulário para filtro de viagens
- Exibição da lista de viagens segundo filtro

24/11/2024 e 25/11/2024

### 8 - DevOps: Conteinerização da aplicação

### 9 - Refatoração

26/11/2024 e 27/11/2024

### 10 - Features opcionais

- Testes unitários
- Validação com Zod
- Entrega do projeto

27/11/2024

### 11 - Deadline

- Preenchimento do formulário Google
- Entrega da aplicação