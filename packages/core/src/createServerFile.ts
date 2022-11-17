import fsExtra from "fs-extra";
import path from "path";

type ConfigServerProps = {
  content: string;
};

export default function buildServer(configServer: ConfigServerProps) {
  fsExtra.outputFile(
    path.join(process.cwd(), `./server/index.js`),
    configServer.content
  );
}
