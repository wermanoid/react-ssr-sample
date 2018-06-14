import React from 'react';
import { get } from 'lodash';
import { injectable } from 'inversify';
import { argument, property, method } from '#core/injections';

const App = () => <div>Router works {get({a:1}, 'a', 2)}</div>;

abstract class Abstraction<T = {}> {
  public abstract exec(): T;
}

abstract class DataSource extends Abstraction {}

@injectable()
class Sample {
  constructor(
    @argument(Abstraction) private arg1: Abstraction,
    @argument(String) private arg2: string
  ) {
    console.log(this.arg1, this.arg2);
  }

  @property(Number)
  smaple: Number;

  @method(DataSource)
  doIt(sample: DataSource) {};
}

console.log(Reflect.getMetadataKeys(Sample));
console.log(Reflect.getOwnMetadata('inversify:tagged_props', Sample));
console.log(Reflect.getOwnMetadata('inversify:paramtypes', Sample));
console.log(Reflect.getOwnMetadata('design:paramtypes', Sample));

export default App;
