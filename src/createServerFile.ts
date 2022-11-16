import fsExtra from "fs-extra";
import path from "path";

type ConfigServerProps = {
  name: string;
  content: string;
};

export default function buildServer(configServer: ConfigServerProps) {
  fsExtra.outputFile(
    path.join(__dirname, `../apps/${configServer.name}/dist/index.js`),
    configServer.content
  );
}
