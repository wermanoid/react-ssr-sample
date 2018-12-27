import chalk from 'chalk';
import { Compiler, ICompiler, Stats } from 'webpack';

export const logMessage = (message: string, level = 'info') => {
  const color =
    level === 'error' ? 'red' : level === 'warning' ? 'yellow' : 'white';
  console.log(`[${new Date().toISOString()}]`, chalk[color](message));
};

// export const compilerPromise = (compiler: ICompiler) => {
//   return new Promise((resolve, reject) => {
//     (compiler as Compiler).hooks.done.tap('done', (stats) => {
//       if (stats.hasErrors()) {
//         return reject('Compilation failed');
//       }
//       return resolve();
//     });
//   });
// };

export const compilerPromise = (name: string, compiler: Compiler) => {
  return new Promise((resolve, reject) => {
    compiler.hooks.compile.tap(name, () => {
      logMessage(`[${name}] Compiling `);
    });
    compiler.hooks.done.tap(name, (stats: any) => {
      if (!stats.hasErrors()) {
        return resolve();
      }
      return reject(`Failed to compile ${name}`);
    });
  });
};

export const compileAndWatch = (
  compiler: ICompiler,
  opts: Compiler.WatchOptions = {},
) => {
  const runner = compiler as Compiler;
  return new Promise((resolve, reject) => {
    runner.watch(opts, (error: Error, stats: Stats) => {
      if (!error && !stats.hasErrors()) {
        logMessage(stats.toString(runner.options.stats), 'info');
        return resolve();
      }
      logMessage(stats.toString(runner.options.stats), 'error');
      logMessage(error.message, 'error');
      return reject('Compilation failed');
    });
  });
};

export const compile = (compiler: ICompiler) => {
  const runner = compiler as Compiler;
  return new Promise((resolve, reject) => {
    runner.run((error: Error, stats: Stats) => {
      if (!error && !stats.hasErrors()) {
        logMessage(stats.toString(runner.options.stats), 'info');
        return resolve();
      }
      logMessage(stats.toString(runner.options.stats), 'error');
      logMessage(error.message, 'error');
      return reject('Compilation failed');
    });
  });
};
