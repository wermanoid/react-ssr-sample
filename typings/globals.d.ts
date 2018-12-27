import webpack from 'webpack';

declare global {
  export interface IClientServer<T> {
    client: T;
    server: T;
  }

  declare namespace App {
    export interface Config {
      host: string | number;
      port: string | number;
      api: string;
      env: string;
      paths: {
        build: IClientServer<string>;
        source: IClientServer<string>;
        public: string;
      };
    }
  }
}
