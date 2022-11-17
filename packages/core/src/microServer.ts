import { MicroServerCreateFrontProps, MicroServerProps } from "./types";
import express, { Router } from "express";
import { green, yellow, magenta } from "colors";
import path from "path";
import cors from "cors";
import { createPath } from "./utils";
import logger from "./logger";

const app = express();

app.use(cors());

export default class MicroServer {
  constructor(private readonly properties: MicroServerProps) {}

  createMicrofront = (props: MicroServerCreateFrontProps) => {
    const { basePath, name, output } = props;
    const folderPath = `./apps/${name}/${output || "dist"}`;
    app.use(
      `/`,
      express.static(path.join(this.properties.dirname, folderPath))
    );
    let url: string | RegExp = basePath;
    app.get(url, (_req, res) => {
      return res.sendFile(
        path.join(this.properties.dirname, folderPath, "index.html")
      );
    });
  };

  showMessageMicrofrontUp = (props: MicroServerCreateFrontProps) => {
    logger("APP",props.name)
    logger("BASE_PATH",props.basePath)
  };

  showMessageRunning = () => {
    logger("RUNNING IN PORT:",String(this.properties.port));
  };

  start = () => {
    this.properties.apps.forEach((app) => {
      const payload: MicroServerCreateFrontProps = {
        basePath: createPath(app.basePath),
        output: app.output,
        name: app.name,
      };
      this.createMicrofront(payload);
      this.showMessageMicrofrontUp(payload);
    });

    app.listen(this.properties.port, () => {
      this.showMessageRunning();
    });
  };
}
