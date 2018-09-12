const webpack = require('webpack');
const merge = require('webpack-merge');
const { main, optimise, rules, plugins } = require('./config/index');

module.exports = ({ paths, project, environment, replace_options, cdn }) => {
  const PATHS = paths;
  const PROJECT = project;
  const PUBLIC_PATH = cdn;
  const COMPRESSION = PROJECT.compression;
  const REPLACE_OPTIONS = replace_options;
  const copyPaths = [
    { from: PATHS.src + '/assets/json/archives/', to: PATHS.dist + '/assets/json/archives/' },
    { from: PATHS.src + '/images/', to: PATHS.dist + '/images/' },
    { from: PATHS.src + '/offline/', to: PATHS.dist + '/offline/' },
    { from: PATHS.src + '/sitemap/', to: PATHS.dist + '/sitemap/' },
    { from: PATHS.src + '/*.{ico,txt,xml,json,png,svg,html}', to: PATHS.dist + '/', flatten: true },
    { from: PATHS.src + '/.htaccess', to: PATHS.dist + '/' },
  ];
  const copyOptions = { debug: 'warning', ignore: [], copyUnmodified: true }; // 'warning', 'info', 'debug'
  const cleanPaths = [PATHS.dist];
  const cleanOptions = { root: PATHS.projectRoot, verbose: true, exclude: ['language'] };
  const assetName = '[path][name].[ext]';

  const { env, environmentVars } = environment;
  const isProduction = env === 'production';

  return merge([
    main.setProductionMode(),
    main.setEntries({ main: [PATHS.entryFile] }),
    main.setOutput({
      jsOut: PATHS.jsOut,
      pathToDirectory: PATHS.dist,
      publicPath: PUBLIC_PATH,
      isProduction,
    }),
    main.resolveDependencies({ aliases: {}, src: PATHS.src + '/js' }),
    main.setPerformance(),
    main.setStats({}),

    plugins.enableScopeHoisting(),

    optimise.createVendorChunk(PROJECT.vendorName),
    optimise.createInlineManifestChunk(PROJECT.manifestName), // must come after createVendorChunk

    rules.loadStaticImageAssets({ name: assetName, context: PATHS.src, publicPath: '../' }),
    rules.loadStaticFontAssets({ name: assetName, context: PATHS.src, publicPath: '../' }),

    rules.replaceConfigOptions(REPLACE_OPTIONS),

    rules.eslintPre(),
    rules.transpileJavaScript(),
    optimise.minifyJS({ sourceMap: true }),

    rules.extractCss({ cssOut: PATHS.cssOut, isProduction }),
    rules.compileSCSS({ extract: true, isProduction, sourceMap: true }),
    optimise.minifyCSS({ sourceMap: true }),

    plugins.cleanDirectory({ cleanPaths, cleanOptions }),
    plugins.copy({ copyPaths, copyOptions }),

    plugins.hashModuleIDs(),

    plugins.define({ env, opts: environmentVars }),

    plugins.generateHTML({
      title: PROJECT.title,
      template: PATHS.templateDir + '/index.ejs',
      filename: 'index.html',
      opts: {
        baseHref: PROJECT.baseHref,
        cdn: PROJECT.cdn,
      },
    }),
    plugins.generateDistSourceMaps({
      exclude: new RegExp(PROJECT.vendorName + '|' + PROJECT.manifestName),
    }),
    // plugins.inlineManifest(),

    PROJECT.serviceworker && plugins.addServiceWorker({ entry: PATHS.src + '/sw.js' }),

    // plugins.runWebpackBundleAnalyzer(),
  ]);
};

