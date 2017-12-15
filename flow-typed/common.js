// @flow

declare var module : {
  hot: {
    accept(path: string, callback: () => void): void;
  };
};

declare module 'react-dom' {
  declare function hydrate<ElementType: React$ElementType>(
    element: React$Element<ElementType>,
    container: ?HTMLElement,
    callback?: () => void,
  ): React$ElementRef<ElementType>;
}
