declare module 'terser-webpack-plugin';
declare module 'write-file-webpack-plugin';
declare module 'nodemon';

declare module 'express-manifest-helpers' {
  import { Handler } from 'express';
  export default (config: any) => Handler;
}
