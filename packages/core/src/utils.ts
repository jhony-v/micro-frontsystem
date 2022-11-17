import { AppConfig } from "./types";
import { execa, execaCommand } from "execa";
import path from "path";

export const normalizeApps = <T extends object>(apps: T) => {
  return Object.keys(apps).map((currentApp) => {
    return {
      name: currentApp,
      ...apps[currentApp],
    };
  }) as AppConfig[];
};

export const executePreBuildScript = async ({
  name,
  preBuildScript,
}: AppConfig) => {
  if (preBuildScript) {
    return new Promise(async (resolve) => {
      execaCommand(`npm run ${preBuildScript}`, {
        cwd: path.join(process.cwd(), "apps", name),
      })
        .stdout.pipe(process.stdout)
        resolve(true)
    });
  }
};
