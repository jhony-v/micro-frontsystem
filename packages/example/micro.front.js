const { micro } = require("micro-frontsystem");

const { run } = micro({
  apps: {
    homepage: {
      basePath: "/",
      preBuildScript: "app:build",
      output: "build",
    },
    marketing: {
      basePath: "/marketing",
      preBuildScript: "app:build",
      output: "build",
    },
    selling: {
      basePath: "/selling",
      preBuildScript: "app:build",
      output: "dist",
    },
  },
  port: 8000
});

run();
