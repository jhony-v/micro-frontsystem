import { AppConfig } from "./types";

type BuildTemplateProps = {
  port: number;
  apps: AppConfig[];
};

export default function buildTemplate(templateProps: BuildTemplateProps) {
  return `
    const express = require('express');
    const app = express();
    const colors = require('colors');
    const { Router } = require("express");
    const path = require("path");

    ${createMicrofrontFunction()}
    ${templateProps.apps.map((props) => createRoute({ name: props.name! })).join("\n")}
    
    app.listen(${templateProps.port},() => {
        console.log("RUNNING: " + colors.green("${templateProps.port}"))
    })
    `.trim();
}

function createMicrofrontFunction() {
  return `
    function createMicrofront(props) {
      const { url, project } = props;
      const basePath = \`../apps/\${project}/dist\`
      const router = Router();
      router.use("/", express.static(path.join(__dirname,basePath)));
      router.get(url, function (req, res) {
        return res.sendFile(path.join(__dirname,basePath,"index.html"));
      });
      app.use(router);
    }
  `.trim();
}

function createRoute(props: { name: string }) {
  return `
    createMicrofront({
      url: "/${props.name}*",
      project: "${props.name}",
    });
  `.trim();
}
