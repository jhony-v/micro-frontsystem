# micro-frontsystem

Create micro-frontends with easy configurations across your monorepo that you've already set up.

Configuration created in your root project.

This is the straightforward configuration create in the root of your project linking multiple applications once.

```js
//micro.front.js
const { micro } = require("micro-frontsystem");

const { run } = micro({
  apps: {
    marketing: {
      basePath: "/marketing",
      preBuildScript: "build",
      output: "build" // default is dist, if this change, you must change it here as well
    },
    selling: {
      basePath: "/selling",
      preBuildScript: "build",
    },
  },
  port: 8000,
});

run();
```

Let's see the frontend structure and how it is ready to build our codebase.

```
├───apps
│   ├───marketing
│   │   ├───build
│   │   ├───src
│   │   └───package.json
│   └───selling
│   │   ├───dist
│   │   ├───src
│   │   └───package.json
├──micro.front.js
```

```console
node ./micro.front.js
```