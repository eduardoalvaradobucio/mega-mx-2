/**
 *  A  N  Y  L  O  G  G  E  R
 *  Get a logger. Any logger.
 *
 *  © 2024 by Stijn de Witt, some rights reserved
 *  Licensed under the MIT Open Source license
 *  https://opensource.org/licenses/MIT
 */
// the main `anylogger` function
const anylogger = (name) => (
// return the existing logger, or
anylogger.all[name] ||
    // create and store a new logger with that name
    (anylogger.all[name] = anylogger.ext(anylogger.new(name))));
// all loggers created so far
anylogger.all = Object.create(null);
// the supported levels
anylogger.levels = { error: 1, warn: 2, info: 3, log: 4, debug: 5, trace: 6 };
// creates a new named log function
anylogger.new = (name) => ({
    // to assign the function `name`, set it to a named key in an object.
    // the default implementation calls `anylogger.log`, which should be a
    // good choice in many cases.
    [name]: (...args) => anylogger.log(name, ...args)
}[name]); // return only the function, not the encapsulating object
// logs with the logger with the given `name`
anylogger.log = (name, ...args) => {
    // select the logger to use
    anylogger.all[name][
    // select the level to use
    // if multiple args and first matches a level name
    (((args.length > 1) && anylogger.levels[args[0]])
        ? args.shift() // use the level from the args
        : 'log' // else use default level `'log'`
    )](...args); // call method matching level with remaining args
};
// extends the given `logger` function
// the implementation here only adds no-ops
// adapters should change this behavior
anylogger.ext = (logger) => {
    logger.enabledFor = () => { };
    for (const method in anylogger.levels) {
        logger[method] = () => { };
    }
    return logger;
};
// this is a real ESM module
// we transpile the compiled Javascript back to commonjs with rollup
export default anylogger;
//# sourceMappingURL=anylogger.js.map