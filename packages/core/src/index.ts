import {
  AppConfig,
  MicroConfiguration,
  MicroConfigurationResponse,
} from "./types";
import buildTemplate from "./buildTemplate";
import createServerFile from "./createServerFile";
import shellJs from "shelljs";

const normalizeApps = <T extends object>(apps: T) => {
  return Object.keys(apps).map((currentApp) => {
    return {
      name: currentApp,
      ...apps[currentApp],
    };
  }) as AppConfig[];
};

const executePreBuildScript = ({ name, preBuildScript }: AppConfig) => {
  shellJs.exec(`cd apps/${name} && pnpm run ${preBuildScript}`);
};

const liftMultipleApplications = <T extends AppConfig[]>(appsLists: T) => {
  const createScripts = [...appsLists].map((app) => {
    return `"node ./apps/${app.name}/dist/index.js"`;
  });
  const scripts = createScripts.join(" ").trim();
  shellJs.exec(`npx concurrently ${scripts} -r`);
};

const micro = <T>(props: MicroConfiguration<T>): MicroConfigurationResponse => {
  const { apps: inputApps, autoLift } = props;
  const apps = normalizeApps(inputApps);
  
  return {
    run() {
      for (const app of apps) {
        const templateContent = buildTemplate({
          basePath: app.basePath,
          name: app.name!,
          port: app.port,
        });

        app.preBuildScript && executePreBuildScript(app);

        createServerFile({
          name: app.name!,
          content: templateContent,
        });
      }

      autoLift && liftMultipleApplications(apps);
    },
  };
};

export default micro;
