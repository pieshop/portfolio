const webpack = require('webpack');
const merge = require('webpack-merge');
const { main, optimise, rules, plugins } = require('./config/index');

module.exports = ({ paths, project, environment, minimize }) => {
  const VERSION = JSON.stringify(require('../../package.json').version);
  const { env, cdn, environmentVars, replace_options:REPLACE_OPTIONS } = environment;

  const PATHS = paths;
  const PROJECT = project;
  const PUBLIC_PATH = cdn;

  const copyPaths = [
    { from: PATHS.src + '/assets/json/archives/', to: PATHS.dist + '/assets/json/archives/' },
    { from: PATHS.src + '/images/', to: PATHS.dist + '/images/' },
    { from: PATHS.src + '/offline/', to: PATHS.dist + '/offline/' },
    { from: PATHS.src + '/sitemap/', to: PATHS.dist + '/sitemap/' },
    { from: PATHS.src + '/*.{ico,txt,xml,json,png,svg,html}', to: PATHS.dist + '/', flatten: true },
    { from: PATHS.src + '/version.json', to: PATHS.dist + '/version.json' },
  ];
  const copyOptions = { debug: 'warn', ignore: [], copyUnmodified: true }; // 'warn', 'info', 'debug'
  const cleanOptions = { verbose: false };
  const assetName = '[path][name].[ext]';

  const generateHTML = PROJECT.generateHTML;
  const sourceMap = PROJECT.generateSourcemaps;
  const dropConsole = PROJECT.dropConsole;
  const isHashed = PROJECT.isHashed;
  const isVendorChunked = PROJECT.isVendorChunked;
  const isManifestInlined = PROJECT.isManifestInlined;

  return merge([
    main.setProductionMode(),
    main.setEntries({ main: [PATHS.entryFile] }),
    main.setOutput({ jsOut: PATHS.jsOut, pathToDirectory: PATHS.dist, publicPath: PUBLIC_PATH, isHashed }),
    main.resolveDependencies({ aliases: {}, src: PATHS.src + '/js' }),
    main.setPerformance(),
    main.setStatsPreset({ type: 'minimal' }), // errors-only, minimal, none, normal, verbose ::: https://webpack.js.org/configuration/stats/

    plugins.enableScopeHoisting(),

    isVendorChunked && optimise.createVendorChunk(PROJECT.vendorName),
    isVendorChunked && isManifestInlined && optimise.createInlineManifestChunk(PROJECT.manifestName), // must come after createVendorChunk

    rules.loadStaticImageAssets({ name: assetName, context: PATHS.src, publicPath: '../' }),
    rules.loadStaticFontAssets({ name: assetName, context: PATHS.src, publicPath: '../' }),

    rules.replaceConfigOptions(REPLACE_OPTIONS),

    rules.eslintPre(),
    rules.transpileJavaScript(),
    optimise.minifyJS({ minimize, sourceMap, dropConsole }),

    rules.extractCss({ cssOut: PATHS.cssOut, isHashed }),
    rules.compileSCSS({ extract: true, sourceMap }),
    // minimize && optimise.minifyCSS({ sourceMap }),

    plugins.cleanDirectory({ cleanOptions }),
    plugins.createVersionFile({ packageFile: PATHS.root + '/package.json', template: PATHS.templateDir + '/version.ejs', outputFile: PATHS.src + '/version.json' }),
    plugins.copy({ copyPaths, copyOptions }),

    plugins.hashModuleIDs(),

    plugins.define({ env, opts: environmentVars }),

    generateHTML &&
      plugins.generateHTML({
        title: PROJECT.title,
        template: PATHS.templateDir + '/index.ejs',
        filename: 'index.html',
        opts: {
          baseHref: PROJECT.baseHref,
          cdn: PROJECT.cdn,
        },
      }),
    isManifestInlined && plugins.inlineManifest(PROJECT.manifestName),
    sourceMap &&
      plugins.generateDistSourceMaps({
        exclude: new RegExp(PROJECT.vendorName + '|' + PROJECT.manifestName),
      }),
    PROJECT.serviceworker && plugins.addServiceWorker({ entry: PATHS.src + '/', name: 'sw.js' }),
    // plugins.runWebpackBundleAnalyzer(),
  ]);
};

