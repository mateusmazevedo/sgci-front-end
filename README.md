# SGCI Front-end

Interface web do **SGCI – Sistema Gerenciador de Cadastro Imobiliário**, para consultar, cadastrar, editar e visualizar pessoas físicas e jurídicas e seus endereços.

> 🇬🇧 *Web client for a real-estate registry system, built with Vue 3 and Quasar. Consumes a Spring Boot REST API with server-side pagination, full CRUD and CSV export.*

A API em Java/Spring Boot está em [sgci-api](https://github.com/mateusmazevedo/sgci-api).

## Funcionalidades

- Consulta de pessoas em tabela com paginação e ordenação feitas no servidor
- Cadastro e edição no mesmo formulário, com dados pessoais e endereço
- Tela de visualização dos dados de cada registro
- Remoção com confirmação
- Download do cadastro em CSV

## Stack

| Item | Tecnologia |
| --- | --- |
| Framework | Vue 3 (Composition API) |
| UI | Quasar 2 |
| Build | Vite (Quasar CLI) |
| Rotas | Vue Router |
| HTTP | Axios |
| Qualidade | ESLint e Prettier |

## Estrutura

```
src/
├── pages/pessoas/
│   ├── GridPessoa.vue         → listagem paginada, ações e exportação CSV
│   ├── CreateEditPessoa.vue   → formulário de cadastro e edição
│   └── ViewPessoa.vue         → visualização de um registro
├── services/
│   └── sgci-api-service.js    → cliente da API (Axios)
├── layouts/                   → layout principal e menu
└── router/                    → rotas da aplicação
```

## Rotas

| Rota | Tela |
| --- | --- |
| `/pessoas` | Consulta de pessoas |
| `/pessoas/form` | Novo cadastro |
| `/pessoas/form/:id` | Edição |
| `/pessoas/view/:id` | Visualização |

## Como rodar

**Pré-requisitos:** Node.js 22+ e a [sgci-api](https://github.com/mateusmazevedo/sgci-api) rodando.

```bash
cd sgci-front-end
npm install
npm run dev
```

O endereço da API é definido em `.env`:

```
VITE_API_SGCI=http://localhost:8080/v1/api
```

## Autor

**Mateus Maciel Azevedo** – Desenvolvedor Full-Stack
[LinkedIn](https://www.linkedin.com/in/mateus-maciel-azevedo-577653163)
