const webpack = require('webpack');
const merge = require('webpack-merge');
const { server, main, optimise, rules, plugins } = require('./config/index');

module.exports = ({ paths, project, replace_options }) => {
  const PATHS = paths;
  const PROJECT = project;
  const PUBLIC_PATH = PROJECT.devserverURL + '/';
  const REPLACE_OPTIONS = replace_options;
  const isProduction = false;
  const assetName = '[path][name].[ext]';

  const environmentVars = {
    __SERVICE_WORKER__: JSON.stringify(false),
  };

  return merge([
    server.setDevServer({
      open: true,
      host: PROJECT.devserverHost,
      contentBase: PATHS.contentBase,
      port: PROJECT.devserverPort,
    }),
    main.setDevMode(),
    main.setEntries({
      main: [PROJECT.devServer, 'webpack/hot/only-dev-server', PATHS.entryFile],
    }),
    main.setOutput({
      jsOut: PATHS.jsOut,
      pathToDirectory: '/',
      publicPath: PUBLIC_PATH,
      isProduction,
    }),
    main.resolveDependencies({ aliases: {}, src: PATHS.src + '/js' }),
    main.setPerformance(),
    main.setStats({}),

    optimise.createVendorChunk(PROJECT.vendorName),
    optimise.nameModuleIDs(true),

    rules.loadStaticImageAssets({ name: assetName, context: PATHS.src, publicPath: PUBLIC_PATH }),
    rules.loadStaticFontAssets({ name: assetName, context: PATHS.src, publicPath: PUBLIC_PATH }),

    rules.replaceConfigOptions(REPLACE_OPTIONS),

    rules.eslintPre(),
    rules.transpileJavaScript(),

    rules.compileSCSS({ extract: false, isProduction, sourceMap: true }),

    main.addVendorShortcut({
      name: 'TweenMax',
      alias: { TweenMax: PATHS.nodeDir + '/gsap/src/uncompressed/TweenMax.js' },
    }),

    plugins.define({ env: 'development', opts: environmentVars }),
    plugins.generateHTML({
      title: PROJECT.title,
      template: PATHS.templateDir + '/index_watch.ejs',
      filename: 'index.html',
      writeToDisk: false,
      opts: {
        devServer: PUBLIC_PATH,
      },
    }),
    // plugins.writeHTMLtoDisk({ outputPath: PATHS.htmlOutPath }),
    plugins.provideReact(),
    plugins.setExtraPlugins([new webpack.HotModuleReplacementPlugin()]),
    plugins.generateDevSourceMaps({
      exclude: new RegExp(PROJECT.vendorName + '|' + PROJECT.manifestName),
    }),
  ]);
};


// const webpack = require('webpack');
// const merge = require('webpack-merge');
// const PATHS = require('./constants/paths');
// const PROJECT = require('./constants/project');
// const {server, main, optimise, rules, plugins} = require('./config/index');
//
// /**
//  * Based off:
//  * https://github.com/Tomekmularczyk/react-starter/tree/master/config
//  */
// module.exports = (options = {}) => {
//   const TARGET = options.target;
//   const REPLACE_OPTIONS = options.replace_options;
//   const ENV = 'development';
//   const PUBLIC_PATH = '/';
//   const CSS_PUBLIC_PATH = '/';
//   const isProduction = false;
//
//   // console.log('ENV', ENV, '\nOUTPUT_DIR', PATHS.dist, '\nREPLACE_OPTIONS', REPLACE_OPTIONS);
//
//   return merge([
//     server.setDevServer(),
//     main.generateSourceMaps('eval'),
//     main.setDevMode(),
//     main.setEntries({
//       app: [
//         'react-hot-loader/patch',
//         PROJECT.devServer,
//         'webpack/hot/only-dev-server',
//         PATHS.entryFile,
//       ],
//     }),
//     main.setOutput({ pathToDirectory: PATHS.root, publicPath: PUBLIC_PATH, isProduction }),
//     main.resolveDependencies({ aliases: {}, src: PATHS.src + '/js' }),
//     main.setPerformance(),
//     main.setStats({}),
//
//     optimise.createVendorChunk(),
//
//     rules.loadStaticImageAssets({ name: PATHS.images, publicPath: CSS_PUBLIC_PATH }),
//     rules.loadStaticFontAssets({ name: PATHS.fonts, publicPath: CSS_PUBLIC_PATH }),
//
//     rules.replaceConfigOptions(REPLACE_OPTIONS),
//
//     rules.eslintPre(),
//     rules.transpileJavaScript(),
//
//     rules.compileSCSS({ extract: false, isProduction, sourceMap: true  }),
//
//     main.addVendorShortcut({
//       name: 'TweenMax',
//       alias: { TweenMax: PATHS.nodeDir + '/gsap/src/uncompressed/TweenMax.js' },
//     }),
//
//     plugins.define({ env: ENV, opts: { __SERVICE_WORKER__: false } }),
//     plugins.generateHTML({
//       title: PROJECT.title,
//       pathToTemplate: PATHS.templateDir + '/index_watch.ejs',
//       baseHref: '//localhost:' + PROJECT.devserverPort,
//     }),
//     plugins.setExtraPlugins([
//       new webpack.NamedModulesPlugin(),
//       new webpack.HotModuleReplacementPlugin(),
//       new webpack.ProvidePlugin({ React: 'react' }),
//     ]),
//
//   ]);
// };
