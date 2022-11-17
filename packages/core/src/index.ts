import { MicroConfiguration, MicroConfigurationResponse } from "./types";
import { normalizeApps, executePreBuildScript } from "./utils";
import server from "./server";

export const micro = <T>(
  props: MicroConfiguration<T>
): MicroConfigurationResponse => {
  const { apps: inputApps, port } = props;
  const apps = normalizeApps(inputApps);

  return {
    async run() {
      try {
        await Promise.all([...apps].map(app => executePreBuildScript(app)))
        server({
          apps,
          dirname: process.cwd(),
          port,
        });
      } catch (error) {
        console.log(error.message);
      }
    },
  };
};
