import { AppConfig } from "./types";
import { executePreBuildScript } from "./utils";

export default class BuildScript {
  constructor(private readonly apps: AppConfig[]) {}

  pre = async () => {
    await Promise.all([...this.apps].map((app) => executePreBuildScript(app)));
  };
}
