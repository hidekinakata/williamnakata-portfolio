# William Nakata - Portfolio Pessoal

Este é o repositório do meu portfólio pessoal, desenvolvido para apresentar minha trajetória como **Analista de Sistemas** e **Fullstack Developer**. O projeto foca em uma experiência de usuário fluida, design moderno e gerenciamento de conteúdo dinâmico.

## 🚀 Tecnologias

O projeto foi construído utilizando as seguintes tecnologias:

- **Framework:** [Next.js 15+](https://nextjs.org/) (App Router & React 19)
- **Estilização:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Componentes UI:** [shadcn/ui](https://ui.shadcn.com/) (Personalizados)
- **Banco de Dados & Backend:** [Supabase](https://supabase.com/) (PostgreSQL)
- **Animações:** [Framer Motion](https://www.framer.com/motion/)
- **Ícones:** [Lucide React](https://lucide.dev/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)

## ✨ Funcionalidades

- **Experiências & Projetos Dinâmicos:** Integração total com o Supabase para gerenciar e exibir experiências profissionais e projetos em destaque de forma dinâmica.
- **Blog Integrado:** Um espaço dedicado para compartilhamento de conhecimento e artigos técnicos.
- **Suporte Multi-idioma:** Estrutura preparada para suporte a Português (PT) e Inglês (EN) via banco de dados.
- **Design Responsivo:** Interface otimizada para todos os tamanhos de tela.
- **Performance:** Otimização de fontes e imagens nativa do Next.js.

## 🛠️ Estrutura do Banco de Dados

O projeto utiliza uma estrutura robusta no PostgreSQL para suportar a internacionalização de conteúdos, incluindo tabelas para:
- `profile` & `profile_translations`
- `experience` & `experience_translations`
- `projects` & `project_translations`
- `posts` (Blog) & `post_translations`
- `technologies`

## 🏁 Começando

### Pré-requisitos

- Node.js 20+
- Conta no Supabase (com o banco configurado conforme o `database setup.sql`)

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/williamnakata-portfolio.git
   ```

2. Instale as dependências:
   ```bash
   yarn install
   # ou
   npm install
   ```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env.local` na raiz do projeto com suas credenciais do Supabase:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
   ```

4. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

---

Desenvolvido por [William Hideki Nakata](https://github.com/hidekinakata)
