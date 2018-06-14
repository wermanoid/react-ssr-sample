import { inject } from 'inversify';

export const property = <A extends {} | Function>(abstraction: A) => <
  T,
  C extends keyof T & string
>(
  target: T,
  property: C,
  index?: number
) => {
  const injectionName =
    (<Function>abstraction).name || abstraction.constructor.name;
  inject(injectionName)(target, property, index);
};

export const argument = property;

export const method = <A extends {}>(...abstractions: A[]) => (
  target: {},
  name: string,
  descriptor: {}
) => {
  console.log(target, name, descriptor);
};
