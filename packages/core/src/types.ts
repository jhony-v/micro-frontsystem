

export interface TemplateCreateRoute {
  name: string, 
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
 run(): void   
}