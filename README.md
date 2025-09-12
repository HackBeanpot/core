# 🌆 Welcome to the HackBeanpot Mono-Repo!

The Core repository is the core of HackBeanpot's webapps! Here we house the main and livesites, and application portal!

### 🎪 Local Setup

1. Clone repo & cd into directory

   ```
   git clone git@github.com:HackBeanpot/core.git
   cd core
   ```

2. Install & use Node v.24

   ```
   nvm install 24
   nvm use 24
   ```

3. Install packages

   ```
   yarn install
   ```

4. Run each app with the following commands:

   **mainsite:**

   ```
   yarn run dev
   ```

   **livesite:**

   ```
   yarn run dev:live
   ```

   **app portal:**

   ```
   yarn run dev:app
   ```

---

### 🍿 Contributor Guidelines

🤡 **Branches**
The main branch acts as our production branch, meaning anything that gets pushed to main will be deployed to the production site by Vercel. To streamline development, all feature branches are created off of the `dev` branch (mainsite & livesite only). App portal development is done off of `dev-app-portal`. Please refer below for examples on feature/bugfix branch naming conventions:

```
mainsite/feature/<feature-description>
livesite/bugfix/<bugfix-description>
app-portal/hotfix/<hotfix-description>
```

Once a sprint is complete or you are ready to deploy to the prod branch, please create a release as part of the deployment. Release versioning will operate like: `year.sprint-number.minor-changes`. An example for this year would be: `25.1.9`.

🎡 **Directory Structure**

- `apps`
  - contains directories for each application.
- `packages`
  - `config-tailwind`
    - tailwind theme/breakpoint configs
  - `ui`
    - shared components use among 1 or more of the applications
  - `utils`
    - utility functions, fonts & hooks

🎫 **Misc**
To upgrade node version, ensure to change the version in `.nvmrc` and in `package.json`.

If you would like to modify the build hooks, also refer to `package.json`.

---

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app with [Tailwind CSS](https://tailwindcss.com/)
- `web`: another [Next.js](https://nextjs.org/) app with [Tailwind CSS](https://tailwindcss.com/)
- `ui`: a stub React component library with [Tailwind CSS](https://tailwindcss.com/) shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

Additional Documentation:

- [Tailwind CSS](https://tailwindcss.com/) for styles
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
