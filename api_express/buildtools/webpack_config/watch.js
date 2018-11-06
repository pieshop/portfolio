const webpack = require('webpack');
const merge = require('webpack-merge');
const { server, main, optimise, rules, plugins } = require('./config/index');

module.exports = ({ paths, project, environment, replace_options }) => {
  const PATHS = paths;
  const PROJECT = project;
  const PUBLIC_PATH = PROJECT.devserverURL + '/';
  const COMPRESSION = PROJECT.compression;
  const REPLACE_OPTIONS = replace_options;
  const assetName = '[path][name].[ext]';

  const { env, environmentVars } = environment;
  const isProduction = env === 'production';

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

    plugins.define({ env, opts: environmentVars }),
    plugins.generateHTML({
      title: PROJECT.title,
      template: PATHS.templateDir + '/index_watch.ejs',
      filename: 'index.html',
      writeToDisk: false,
      opts: {
        baseHref: PROJECT.baseHref,
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
