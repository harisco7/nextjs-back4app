# Starter template for [Next.js](https://nextjs.org/) and [Back4App](https://www.back4app.com/)

👋 This starter template is very opinionated and is not meant to be a reference standard for how to do development, organize your files and structure your code in Next JS. It's simply an example with reasonable defaults, to get up and running quickly with your Next app and Back4App backend.

## **Main features**

- ✨ GraphQL powered with GraphQL Code Generator, Apollo Client and Back4App Parse GraphQL API
- 📴 Configured fully in Typescript + ESLint & Prettier
- ▲ Latest version of Next JS with official plugins for SEO, PWA, i18n and more
- ✅ Jest and Cypress for unit and E2E testing respectively \*not yet ready
- ☕ Includes examples:
  - Signup, login and auth protected page
  - State management with Apollo Client
  - SCSS modules, global CSS, Barebones CSS, Reseter.css
  - Google fonts

> **NOTE** - This is still work in progress and any suggestions are very appreciated. Feel free to share your opinion, raise an issue or create a PR!

---

## **Get started**

> If you are new to `next.js` or `back4app`, you may want to first checkout [learn next.js](https://nextjs.org/docs) or [back4app get started](https://www.back4app.com/docs/get-started/welcome).

```bash
git clone https://github.com/harisco7/nextjs-back4app.git
```

Or simply use it as a [template](https://github.com/harisco7/nextjs-back4app/generate) for your own repository.

## Installation

First and foremost, install all the dependencies.

```bash
npm i
```

### Step 1: Add Back4App access keys

Enter your **Back4App** Application ID, Client key and Javascript key inside the `.env` file. You can find those in your Back4App settings, under **Security & Keys**. These parameters are used by the Parse SDK, but more importantly by the GraphQL Code Generator to retrieve your Back4App GraphQL schema and generate all the Typescript models and query files.

### Step 2: Run the GraphQL codegen

```bash
npm run codegen
```

After a few seconds, if your Back4App config data is correct, you should get an automatically generated file called `types.ts`, which will contain the whole backend schema, represented in Typescript. Additionally, you should see a file `schema.graphql`, which is a GraphQL representation of your Back4App schema. This enables convenient VSCode intellisense integration, in combination with the [GraphQL VSCode extension.](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql).

### Step 3: Start the dev server

```bash
npm run dev
```

Open the app by navigating to http://localhost:3000 in your browser.

## **Structure overview**

```
├── .husky
├── components
    ├── Card.module.scss
    ├── Intro.module.scss
    ├── Layout.module.scss
    ├── LoginForm.module.scss
    ├── ProfileForm.module.scss
    ├── SignupForm.module.scss
    ├── Card.tsx
    ├── Intro.tsx
    ├── Layout.tsx
    ├── LoginForm.tsx
    ├── ProfileForm.tsx
    ├── SignupForm.tsx
├── css
│   ├── barebones.css
│   ├── global.scss
│   ├── utils.scss
├── graphql
│   └── mutations
│   └── queries
├── hoc
│   ├── withAuth.tsx
├── lib
│   ├── apollo-client.ts
│   ├── auth.ts
│   ├── cache.ts
│   ├── i18n.ts
│   ├── utils.ts
├── pages
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── index.tsx
│   └── login.tsx
│   └── profile.tsx
│   └── signup.tsx
├── public
│   └── locales
│       └── en
├── .env
├── README.md
├── codegen.yml
├── next.config.js
├── next-i18next.config.js
├── next-seo.config.js
├── jest.config.js
├── graphql.config.js
├── package.json
├── tsconfig.json
├── local-schema.graphql
├── schema.graphql
├── types.ts
```

## **Development process**

You can do all your data modelling directly in the Back4App platform. Any changes in the database structure will be reflected through the GraphQL schema. GraphQL Code Generator will then automatically (re)generate all the Typescript classes, GraphQL queries and React Hooks from the given GraphQL schema URL. The same applies whenever a change in the client-schema or GraphQL operations is detected.

You can use the codegen script (**npm run codegen**) any time you are working on the project. This will run the GraphQL Code Generator in watch mode and trigger it automatically on any file change.

Adding additional client-only models and fields can be achieved through the `client-schema.graphql ` file. This file is merged with the downloaded GraphQL schema (`schema.graphql`) from Back4App and used by the GraphQL Code Generator to output all Typescript models. There's an example provided on how to extend the Viewer type from Parse GraphQL schema with an additional string field.

**This template utilizes GraphQL Code Generator as much as possible, so please make sure to check the official [documentation](https://www.graphql-code-generator.com/docs/getting-started/index) to fully understand the benefits and all the options it provides.**

## **Authentication**

There are three user authentication example pages provided, for **signing up** (`signup.tsx`), **logging in** (`login.tsx`) and **logging out** (`profile.tsx`).

Authenticated pages use a Higher-Order Component called `withAuth`. Every page in the pages directory, which requires a user to be logged in, should be wrapped with the **withAuth** HOC. The HOC itself makes the necessary authentication checks, depending on the execution environment.

Authentication check utilizes the **GetCurrentUser** GraphQL query, fetching the `viewer` object available via the Parse GraphQL API. It returns the **current user session**, if there is a valid one on the server, given the **sessionToken** provided via the auth cookie.

For the server side, if a given page does any type of server side data loading (either via `getStaticProps` or `getServerSideProps`), it should provide the necessary authentication data in that context and pass it into page props. An example of such page is provided in `profile.tsx`. If not authenticated, the user is redirected to the **/login page**.

For the client side, the `withAuth` HOC will take care of checking if the user is authenticated and render the component, or if not redirect via the Next JS router to the login page. The redirect route can be passed as an additional parameter into the HOC, but it defaults to /login.

## **Next SEO**

> [Next SEO](https://github.com/garmeeh/next-seo) is a plugin that makes managing your SEO easier in Next.js projects.

This template contains the basic configuration for the Next SEO and the default settings are defined in `next-seo.config.js`. For further information please refer to the official plugin documentation.

## **Next PWA**

> Zero Config PWA Plugin for Next.js, powered by workbox and other good stuff.
> Please refer to the documentation on the GitHub project [page](https://github.com/shadowwalker/next-pwa).

`next.config.js` file is already configured for the Next PWA plugin and after executing `npm run dev` it will output `sw.js` and `workbox.js` files in the public directory.

There is also an example `manifest.json` file located in the public directory. Check the full [MDN documentation](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json) for an overview of all available config options.

## **Next i18n**

> The easiest way to translate your NextJs apps.
> Please refer to the documentation on the GitHub project [page](https://github.com/isaachinman/next-i18next).

This template contains the basic configuration for Next i18n, including a helper function for retrieving the context translations in `utils/translate-helper.ts`. An example of loading the context translations with the given namespaces is provided in `pages/index.ts`.

## **Jest & Cypress**

> Documentation in preparation.

## **Deployment**

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fharisco7%2Fnextjs-back4app) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fharisco7%2Fnextjs-back4app)

## **References**

1. [Local state management with Reactive Variables](https://www.apollographql.com/blog/apollo-client/caching/local-state-management-with-reactive-variables/)
1. [Getting Started With Apollo Client in Next.js](https://www.apollographql.com/blog/apollo-client/next-js/next-js-getting-started/)
1. [Apollo local state](https://www.apollographql.com/docs/tutorial/local-state//)
1. [Managing local state](https://www.apollographql.com/docs/react/local-state/local-state-management/)
1. [GraphQL Cookbook](https://www.back4app.com/docs/parse-graphql/graphql-getting-started)
1. [Implement protected routes in NextJS](https://dev.to/shubhamverma18/implement-protected-routes-in-nextjs-37ml)
1. [React + NextJS - protected routes](https://stackoverflow.com/questions/63251020/react-nextjs-protected-routes)
1. [React + NextJS - protected routes](https://stackoverflow.com/questions/63251020/react-nextjs-protected-routes)
1. [A modern, responsive boilerplate laid bare](https://acahir.github.io/Barebones/)
1. [A Visual Type Scale](https://type-scale.com/)

## **Contribution**

I'm open to contributions & suggestions in making this a lot better ✋.

## **License**

MIT
