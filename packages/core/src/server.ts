import { MicroServerCreateFrontProps, MicroServerProps } from "./types";
import express, { Router } from "express";
import { green, yellow } from "colors";
import path from "path";

const app = express();

function createMicrofront(props: MicroServerCreateFrontProps) {
  const { basePath, name, output, dirname } = props;
  const folderPath = `./apps/${name}/${output || "dist"}`;
  const router = Router();
  router.use("/", express.static(path.join(dirname, folderPath)));
  router.get(basePath, function (req, res) {
    return res.sendFile(path.join(dirname, folderPath, "index.html"));
  });
  app.use(router);
}

const showMessageRunning = (port: number) => {
  console.log(yellow(`RUNNING: ${port}`));
};

const showMessageMicrofrontUp = (props: MicroServerCreateFrontProps) => {
  const content = [ 
    `APP: ${props.name}`,
    `BASE_PATH : ${props.basePath}`,
   ]
  console.log(green(content.join("\n"))
  );
};

export default function server(props: MicroServerProps) {
  props.apps.forEach((app) => {
    const payload: MicroServerCreateFrontProps = {
      basePath: `/${app.name}*`,
      output: app.output,
      name: app.name,
      dirname: props.dirname,
    };
    createMicrofront(payload);
    showMessageMicrofrontUp(payload);
  });

  app.listen(props.port, () => {
    showMessageRunning(props.port);
  });
}
