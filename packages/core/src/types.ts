export interface MicroServerProps {
  port: number;
  apps: AppConfig[];
  dirname: string;
}

export interface MicroServerCreateFrontProps {
  dirname: string
  basePath: string
  name?: string
  output?: string
}

export type AppConfig = {
   basePath: string
   preBuildScript?: string 
   name?: string
   output?: string
}

export interface MicroConfiguration<T> {
  apps: { [ key in keyof T ]: AppConfig };
  port: number
}


export interface MicroConfigurationResponse {
 run(): Promise<void>   
}