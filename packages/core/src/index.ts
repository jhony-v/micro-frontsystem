import {
  AppConfig,
  MicroConfiguration,
  MicroConfigurationResponse,
} from "./types";
import buildTemplate from "./buildTemplate";
import createServerFile from "./createServerFile";
import { exec } from "shelljs";

const normalizeApps = <T extends object>(apps: T) => {
  return Object.keys(apps).map((currentApp) => {
    return {
      name: currentApp,
      ...apps[currentApp],
    };
  }) as AppConfig[];
};

const executePreBuildScript = ({ name, preBuildScript }: AppConfig) => {
  exec(`cd apps/${name} && npm run ${preBuildScript}`);
};

const liftMultipleApplications = () => {
  exec(`node ./server/index.js`);
};

export const micro = <T>(props: MicroConfiguration<T>): MicroConfigurationResponse => {
  const { apps: inputApps, port } = props;
  const apps = normalizeApps(inputApps);
  
  return {
    run() {
      const templateContent = buildTemplate({
        apps,
        port,
      });
      createServerFile({
        content: templateContent,
      });
      for (const app of apps) {
        app.preBuildScript && executePreBuildScript(app);
      }
      liftMultipleApplications();
    },
  };
};