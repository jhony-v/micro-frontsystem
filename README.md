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
      preBuildScript: "build",
    },
    selling: {
      basePath: "/selling",
      preBuildScript: "build",
    },
  },
  port: 8000,
  autoLift: true,
});

run();
```

```console
node ./micro.front.js
```