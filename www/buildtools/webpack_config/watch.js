const webpack = require('webpack');
const merge = require('webpack-merge');
const PATHS = require('./constants/paths');
const PROJECT = require('./constants/project');
const {server, main, optimise, rules, plugins} = require('./config/index');

/**
 * Based off:
 * https://github.com/Tomekmularczyk/react-starter/tree/master/config
 */
module.exports = (options = {}) => {
  const TARGET = options.target;
  const REPLACE_OPTIONS = options.replace_options;
  const ENV = 'development';
  const PUBLIC_PATH = '/';
  const CSS_PUBLIC_PATH = '/';
  const isProduction = false;

  // console.log('ENV', ENV, '\nOUTPUT_DIR', PATHS.dist, '\nREPLACE_OPTIONS', REPLACE_OPTIONS);

  return merge([
    server.setDevServer(),
    main.generateSourceMaps('eval'),
    main.setDevMode(),
    main.setEntries({
      app: [
        'react-hot-loader/patch',
        PROJECT.devServer,
        'webpack/hot/only-dev-server',
        PATHS.entryFile,
      ],
    }),
    main.setOutput({ pathToDirectory: PATHS.root, publicPath: PUBLIC_PATH, isProduction }),
    main.resolveDependencies({ aliases: {}, src: PATHS.src + '/js' }),
    main.setPerformance(),
    main.setStats({}),

    optimise.createVendorChunk(),

    rules.loadStaticImageAssets({ name: PATHS.images, publicPath: CSS_PUBLIC_PATH }),
    rules.loadStaticFontAssets({ name: PATHS.fonts, publicPath: CSS_PUBLIC_PATH }),

    rules.replaceConfigOptions(REPLACE_OPTIONS),

    rules.eslintPre(),
    rules.transpileJavaScript(),

    rules.compileSCSS({ extract: false, isProduction, sourceMap: true  }),

    main.addVendorShortcut({
      name: 'TweenMax',
      alias: { TweenMax: PATHS.nodeDir + '/gsap/src/uncompressed/TweenMax.js' },
    }),

    plugins.define({ env: ENV, opts: { __SERVICE_WORKER__: false } }),
    plugins.generateHTML({
      title: PROJECT.title,
      pathToTemplate: PATHS.templateDir + '/index_watch.ejs',
      baseHref: '//localhost:' + PROJECT.devserverPort,
    }),
    plugins.setExtraPlugins([
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.ProvidePlugin({ React: 'react' }),
    ]),

  ]);
};
