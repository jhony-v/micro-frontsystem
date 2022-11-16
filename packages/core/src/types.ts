
export type AppConfig = {
   basePath: string
   port: number
   preBuildScript?: string 
   name?: string
}

export interface MicroConfiguration<T> {
  apps: { [ key in keyof T ]: AppConfig };
  autoLift?: boolean;
}


export interface MicroConfigurationResponse {
 run(): void   
}