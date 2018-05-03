import { ICompiler, Compiler } from 'webpack';

const chalk = require('chalk');

export const logMessage = (message: string, level = 'info') => {
    const color = level === 'error' ? 'red' : level === 'warning' ? 'yellow' : 'white';
    console.log(`[${new Date().toISOString()}]`, chalk[color](message));
};

export const compilerPromise = (compiler: ICompiler) => {
    return new Promise((resolve, reject) => {
        (compiler as Compiler).hooks.done.tap('done', (stats) => {
            if (stats.hasErrors()) {
                return reject('Compilation failed');
            }
            return resolve();
        });
    });
};
