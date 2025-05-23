# HT Motor - Front-end

Este repositório contém o front-end do sistema **HT Motor**, desenvolvido em React com Vite, TailwindCSS e React Router.

## ✨ Tecnologias

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [React Router DOM](https://reactrouter.com/)
- [ESLint + Prettier](https://eslint.org/) (padronização de código)

## 📁 Estrutura de Pastas

```
src/
  components/         # Componentes reutilizáveis (ex: LoginForm)
  pages/              # Páginas do app (ex: LoginPage)
    LoginPage/
      login.tsx
      styles/
        index.css     # Estilos customizados da página de login
  App.tsx             # Configuração das rotas
  index.css           # Estilos globais e Tailwind
  main.tsx            # Ponto de entrada da aplicação
```

## 🚀 Como rodar o projeto

1. **Instale as dependências:**

   ```bash
   npm install
   # ou
   yarn install
   ```

2. **Rode o projeto em modo desenvolvimento:**

   ```bash
   npm run dev
   # ou
   yarn dev
   ```

3. **Acesse no navegador:**
   ```
   http://localhost:5173/login
   ```

## 📦 Build para produção

```bash
npm run build
# ou
yarn build
```

## 📝 Licença

Este projeto é privado e de uso exclusivo da equipe HT Motor.
