import { MicroConfiguration, MicroConfigurationResponse } from "./types";
import { normalizeApps, executePreBuildScript } from "./utils";
import MicroServer from "./microServer";
import BuildScript from "./buildScript";

export const micro = <T>(
  props: MicroConfiguration<T>
): MicroConfigurationResponse => {
  const { apps: inputApps, port } = props;
  const apps = normalizeApps(inputApps);

  const server = new MicroServer({
    apps,
    port,
    dirname: process.cwd(),
  });
  const buildScript = new BuildScript(apps)

  return {
    async run() {
      try {
        await buildScript.pre();
        server.start();
      } catch (error) {
        console.log(error.message);
      }
    },
  };
};
