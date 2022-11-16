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
  autoLift: true
});

run();
