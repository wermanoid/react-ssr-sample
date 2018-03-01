/**
 * server.d.ts
 * mock jss classes which have no corresponding typings
 */
// tslint:disable: max-classes-per-file

/**
 * mock for SheetsRegistry class in 'react-jss/lib/jss'
 */
declare module 'react-jss/lib/jss' {
  interface ISheetsRegistry {
    new (): SheetsRegistry;
  }

  declare class SheetsRegistry implements ISheetsRegistry {}
}

/**
 * mock for JssProvider class in 'react-jss/lib/JssProvider'
 */
declare module 'react-jss/lib/JssProvider' {
  import { SheetsRegistry } from 'react-jss/lib/jss';
  import { GenerateClassName } from 'jss';

  interface IJssProviderProps {
    registry: SheetsRegistry;
    generateClassName: GenerateClassName<{}>;
  }

  export default class JssProvider extends React.Component<IJssProviderProps> {}
}
