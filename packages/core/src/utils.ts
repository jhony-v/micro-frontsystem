import { AppConfig } from "./types";
import { execaCommand } from "execa";
import path from "path";

export const normalizeApps = <T extends object>(apps: T) => {
  const appKeys = Object.keys(apps);
  const parseApps = appKeys.map((currentApp) => {
    return {
      name: currentApp,
      ...apps[currentApp],
    };
  }) as AppConfig[];
  let data: AppConfig[] = [];
  let defaultAppConfig: AppConfig = null;
  const indexAppConfig = parseApps.findIndex((app) => app.basePath === "/");
  const existsIndexAppConfig = indexAppConfig !== -1;

  data = [
    ...parseApps.slice(0, indexAppConfig),
    ...parseApps.slice(indexAppConfig + 1),
  ];

  if (existsIndexAppConfig) {
    defaultAppConfig = parseApps[indexAppConfig];
    data.unshift({
      ...defaultAppConfig,
      basePath: "default",
    });
  }

  if (existsIndexAppConfig) {
    data.push(defaultAppConfig);
  }
  return data;
};

export const createPath = (path: string) => {
  if (path === "default") return "/";
  if (path === "/") return `/*`;
  return `${path}*`;
};

export const executePreBuildScript = async ({
  name,
  preBuildScript,
}: AppConfig) => {
  if (preBuildScript) {
    return new Promise(async (resolve) => {
      execaCommand(`npm run ${preBuildScript}`, {
        cwd: path.join(process.cwd(), "apps", name),
      }).stdout.pipe(process.stdout);
      resolve(true);
    });
  }
};
