# micro-frontsystem

Create micro-frontends with easy configurations across your monorepo that you've already set up.

Configuration created in your root project.

```js
//micro.front.js
const { micro } = require("micro-frontsystem");

const { run } = micro({
  apps: {
    marketing: {
      basePath: "/marketing",
      port: 8000,
      preBuildScript: "build",
    },
    selling: {
      basePath: "/selling",
      port: 8001,
      preBuildScript: "build",
    },
  },
  autoLift: true,
});

run();
```

```console
node ./micro.front.js
```