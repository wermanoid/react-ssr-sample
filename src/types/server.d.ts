// tslint:disable: max-classes-per-file

declare module 'react-jss/lib/jss' {
  interface ISheetsRegistry {
    new (): SheetsRegistry;
  }

  declare class SheetsRegistry implements ISheetsRegistry {}
}

declare module 'react-jss/lib/JssProvider' {
  import { SheetsRegistry } from 'react-jss/lib/jss';

  interface IJssProviderProps {
    registry: SheetsRegistry;
    generateClassName: any;
  }

  export default class JssProvider extends React.Component<IJssProviderProps> {}
}
