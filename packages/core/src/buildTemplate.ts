type BuildTemplateProps = {
  basePath: string;
  port: number;
  name: string
};

export default function buildTemplate(templateProps: BuildTemplateProps) {
  return `
    const express = require('express');
    const app = express();
    const colors = require('colors');
    app.use('/', express.static(__dirname));
    app.get('${templateProps.basePath}', function(req, res) {
      res.sendFile("index.html");
    });
    app.listen(${templateProps.port},() => {
        console.log("RUNNING: " + colors.green("${templateProps.name}"))
    })
    `.trim();
}
