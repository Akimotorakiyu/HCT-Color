# 🎬 Template-Repo

A pnpm template repo, support typescript out of box with [vite](https://github.com/vitejs/vite) and [esno](https://github.com/esbuild-kit/esno).

## vue example

### install

```sh
pnpm install
```

### https

install `./cert/ca.crt`

### dev

```sh
# vue3 dev
pnpm serve

# react18 example
pnpm serve-react

# node example
pnpm dev

# fass-node example
pnpm dev-fass
```

### debug node/node-fass example

Open the javascript debug terminal of vscode, then run `dev command`.

## deploy

support [netlify.app](https://netlify.app) ([template-repo.netlify.app](https://template-repo.netlify.app))

default to deploy vue example, if you want to deploy react example, just change the `./netlify.toml`.

```toml
# https://docs.netlify.com/configure-builds/file-based-configuration/
#...
[build]
  command = "npx pnpm install --store=node_modules/.pnpm-store && npx pnpm build"
  publish = "packages/example/dist"
#...
```
