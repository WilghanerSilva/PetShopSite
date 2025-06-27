# 🐾 PetShop — Sistema de Gerenciamento de Atendimentos

Sistema completo de gerenciamento de atendimentos para um pet shop, construído com **Laravel**, **React (Inertia.js)**, **Tailwind CSS** e **SQLite**. A aplicação permite o registro e controle de clientes, pets, serviços, sessões de PDV, além de fornecer uma interface diferenciada para cada tipo de usuário (cliente, funcionário e administrador).

---

## ✨ Funcionalidades

- Autenticação e registro de usuários
- Controle de atendimentos com:
  - Cliente
  - Pet
  - Funcionário responsável
  - Sessão de PDV associada
  - Serviços prestados (com valores individuais)
  - Marcação de atendimento como concluído
- Interface diferenciada por tipo de usuário (`Role::Costumer`, `Funcionario`, `Admin`)
- Sessão de caixa (POS):
  - Abertura com valor inicial
  - Encerramento com valor final
  - Controle de saldo e movimentações
- Validações completas no backend com `FormRequest`
- Interface responsiva com Tailwind CSS
- Multiselect de serviços e filtros por cliente
- Proteção de rotas e controle de acesso baseado em permissões
- Contexto de sessão POS no frontend usando React Context
- Deploy possível via Netlify ou Railway

---

## 🧰 Tecnologias Utilizadas

| Stack     | Tecnologias                          |
|-----------|---------------------------------------|
| Backend   | Laravel 11, SQLite, Eloquent ORM      |
| Frontend  | React 19 + Inertia.js, TypeScript     |
| Estilo    | Tailwind CSS                          |
| Outros    | Vite, Zustand, Context API, Inertia   |

---

## 📂 Estrutura do Projeto

```
.
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   └── Requests/
│   └── Models/
├── database/
│   ├── migrations/
│   └── seeders/
├── public/
├── resources/
│   └── js/
│       ├── components/
│       ├── context/
│       ├── layout/
│       └── pages/
├── routes/
│   └── web.php
├── .env
└── README.md
```

## 🚀 Instalação Local

1. Clone o repositório:
   ```bash
     git clone https://github.com/seu-usuario/petshop.git
     cd petshop
   ```
2. Instale dependências:
   ```bash
     composer install
     npm install --legacy-peer-deps
   ```
3. Configure o ambiente:
   ```bash
     cp .env.example .env
     php artisan key:generate
   ```
4. Rode as migrações e seeders:
   ```bash
     php artisan migrate
     php artisan db:seed
   ```
5. Inicie o projeto:
   ```bash
      composer run dev
   ```
   ---
## 🔑 Credenciais Para Logar Como Admin
**Email:** joao.silva@example.com <br>
**Senha:** abcd1234
 ---
  
