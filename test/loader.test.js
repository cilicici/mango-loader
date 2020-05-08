import {
  compile,
  execute,
  getCompiler,
  normalizeErrors,
  readAsset,
} from './helpers';

import { getFileName } from '../src/index'

describe('loader', () => {
  it('should works without options', async () => {
    const compiler = getCompiler('simple.js');
    const stats = await compile(compiler);

    expect(
      execute(readAsset('main.bundle.js', compiler, stats))
    ).toMatchSnapshot('result');
    expect(Object.keys(stats.compilation.assets)).toMatchSnapshot('assets');

    expect(normalizeErrors(stats.compilation.warnings)).toMatchSnapshot(
      'warnings'
    );
    expect(normalizeErrors(stats.compilation.errors)).toMatchSnapshot('errors');
  });

  it('getFileName', () => {
    const fileObjects = [{
      resourcePath: '/node_modules/mango-loader/file.png'
    }, {
      resourcePath: '/node_modules/mango-loader/file'
    }, {
      resourcePath: ''
    }]

    expect(getFileName(fileObjects[0])).toBe('file.png')
    expect(getFileName(fileObjects[1])).toBe('file.bin')
    expect(getFileName(fileObjects[2])).toBe('file.bin')
  })

  it('should work with "ModuleConcatenationPlugin" plugin', async () => {
    const compiler = getCompiler(
      'simple.js',
      {},
      {
        mode: 'production',
        optimization: {
          minimize: false,
        },
      }
    );
    const stats = await compile(compiler);

    expect(
      execute(readAsset('main.bundle.js', compiler, stats))
    ).toMatchSnapshot('result');
    expect(Object.keys(stats.compilation.assets)).toMatchSnapshot('assets');
    expect(normalizeErrors(stats.compilation.warnings)).toMatchSnapshot(
      'warnings'
    );
    expect(normalizeErrors(stats.compilation.errors)).toMatchSnapshot('errors');

    if (stats.compilation.modules.size) {
      expect(stats.compilation.modules.size).toBe(2);
    } else {
      expect(stats.compilation.modules.length).toBe(1);
    }
  });
});
