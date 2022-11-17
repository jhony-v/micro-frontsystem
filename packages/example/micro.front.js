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
  port: 8000
});

run();
