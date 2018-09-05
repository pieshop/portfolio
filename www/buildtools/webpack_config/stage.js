const webpack = require('webpack');
const merge = require('webpack-merge');
const PATHS = require('./constants/paths');
const PROJECT = require('./constants/project');
const {main, optimise, rules, plugins} = require('./config/index');

/**
 * Based off:
 * https://github.com/Tomekmularczyk/react-starter/tree/master/config
 */
module.exports = (options = {}) => {
  const TARGET = options.target;
  const REPLACE_OPTIONS = options.replace_options;
  const ENV = 'development';
  const PUBLIC_PATH = '';
  const CSS_PUBLIC_PATH = '../';
  const isProduction = true;
  const outputDir = PATHS.stage;

  console.log('ENV', ENV, '\nOUTPUT_DIR', outputDir, '\nREPLACE_OPTIONS', REPLACE_OPTIONS);

  const copyPaths = [
    { from: PATHS.src + '/assets/json/archives/', to: outputDir + '/assets/json/archives/' },
    { from: PATHS.src + '/images/', to: outputDir + '/images/' },
    { from: PATHS.src + '/offline/', to: outputDir + '/offline/' },
    { from: PATHS.src + '/sitemap/', to: outputDir + '/sitemap/' },
    { from: PATHS.src + '/*.{ico,txt,xml,json,png,svg,html}', to: outputDir + '/', flatten: true },
    { from: PATHS.src + '/.htaccess', to: outputDir + '/' },
  ];
  const copyOptions = { debug: 'warning', ignore: [], copyUnmodified: true };  // 'warning', 'info', 'debug'

  return merge([
    main.generateSourceMaps('source-map'),
    main.setProductionMode(),
    main.setEntries({ app: [PATHS.entryFile] }),
    main.setOutput({ pathToDirectory: outputDir, publicPath: PUBLIC_PATH, isProduction }),
    main.resolveDependencies({ aliases: {}, src: PATHS.src + '/js' }),
    main.setPerformance(),
    main.setStats({}),

    plugins.enableScopeHoisting(),

    optimise.createInlineManifestChunk(),
    optimise.createVendorChunk(),

    rules.loadStaticImageAssets({ name: PATHS.images, publicPath: CSS_PUBLIC_PATH }),
    rules.loadStaticFontAssets({ name: PATHS.fonts, publicPath: CSS_PUBLIC_PATH }),
    rules.replaceConfigOptions(REPLACE_OPTIONS),

    rules.eslintPre(),
    rules.transpileJavaScript(),
    optimise.minifyJS({ sourceMap: true }),

    rules.extractCss({ isProduction }),
    rules.compileSCSS({ extract: true, isProduction, sourceMap: true }),
    optimise.minifyCSS({ sourceMap: true }),

    main.addVendorShortcut({
      name: 'TweenMax',
      alias: { TweenMax: PATHS.nodeDir + '/gsap/src/uncompressed/TweenMax.js' },
    }),

    plugins.define({ env: ENV, opts: { __SERVICE_WORKER__: true } }),
    plugins.cleanDirectory({ directory: PATHS.dev, projectRoot: PATHS.projectRoot }),
    plugins.copy({ copyPaths, copyOptions }),

    plugins.generateHTML({
      title: PROJECT.title,
      pathToTemplate: PATHS.templateDir + '/index.ejs',
      filename: 'index.html',
      inject: false,
      baseHref: '//stage.stephenhamilton.co.uk',
    }),
    plugins.setExtraPlugins([
      // new webpack.NamedModulesPlugin(),
      new webpack.HashedModuleIdsPlugin(),
      new webpack.ProvidePlugin({ React: 'react' }),
      // new InlineManifestWebpackPlugin('webpackManifest'),
    ]),
    // parts.addServiceWorker({ entry: PATHS.src + '/sw.js' }),
    // parts.runWebpackBundleAnalyzer(),
  ]);
};
