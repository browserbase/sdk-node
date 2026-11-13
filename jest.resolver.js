// stlc writes each new resource test with `import { Response } from 'node-fetch'`, but the
// client returns the native Response on modern Node, so `toBeInstanceOf(Response)` fails.
module.exports = (request, options) =>
  options.defaultResolver(
    request === 'node-fetch' && options.basedir.includes('tests/api-resources') ?
      `${options.rootDir}/src/_shims/index`
    : request,
    options,
  );
