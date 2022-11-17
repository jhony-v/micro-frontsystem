
export type AppConfig = {
   basePath: string
   preBuildScript?: string 
   name?: string
}

export interface MicroConfiguration<T> {
  apps: { [ key in keyof T ]: AppConfig };
  autoLift?: boolean;
  port: number
}


export interface MicroConfigurationResponse {
 run(): void   
}