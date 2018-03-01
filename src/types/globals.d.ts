/**
 * globals.d.ts
 * some global extensions and definitions
 */

// tslint:disable: interface-name

interface Window {
  __INITIAL_STATE__: { [name: string]: * };
  __APOLLO_STATE__: { [name: string]: * };
}

interface NodeModule {
  hot?: {
    accept(path: string, cb: () => void): void;
  };
}

/**
 * Higher order component typedef
 * @template In     input component props type
 * @template Out    wrapped component props type
 * @param component component to wrap
 * @return          wrapped component
 */
declare type Hoc<In = {}, Out = {}> =
  (component: React.ComponentType<In>) => React.ComponentType<Out>;
