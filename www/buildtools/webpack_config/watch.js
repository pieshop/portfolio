const webpack = require('webpack');
const merge = require('webpack-merge');
const { server, main, optimise, rules, plugins } = require('./config/index');

module.exports = ({ paths, project, environment, minimize }) => {
  const PATHS = paths;
  const PROJECT = project;
  const PUBLIC_PATH = PROJECT.devserverURL + '/';
  const assetName = '[path][name].[ext]';

  const { env, environmentVars, replace_options:REPLACE_OPTIONS } = environment;

  const generateHTML = true;
  const sourceMap = false;
  const dropConsole = false;
  const isHashed = false;
  const isVendorChunked = false;
  const writeHTMLToDisk = false;

  return merge([
    server.setDevServer({ open: true, host: PROJECT.devserverHost, contentBase: PATHS.contentBase, port: PROJECT.devserverPort, hot: true }),
    main.setDevMode(),
    main.setEntries({ main: [PROJECT.devServer, 'webpack/hot/only-dev-server', PATHS.entryFile] }),
    main.setOutput({ jsOut: PATHS.jsOut, pathToDirectory: '/', publicPath: PUBLIC_PATH, isHashed }),
    main.resolveDependencies({ aliases: {}, src: PATHS.src + '/js' }),
    main.setPerformance(),
    main.setStats({}),

    isVendorChunked && optimise.createVendorChunk(PROJECT.vendorName),
    optimise.nameModuleIDs(true),

    rules.loadStaticImageAssets({ name: assetName, context: PATHS.src, publicPath: PUBLIC_PATH }),
    rules.loadStaticFontAssets({ name: assetName, context: PATHS.src, publicPath: PUBLIC_PATH }),

    rules.replaceConfigOptions(REPLACE_OPTIONS),

    rules.eslintPre(),
    rules.transpileJavaScript(),
    optimise.minifyJS({ minimize, sourceMap, dropConsole }),

    rules.compileSCSS({ extract: false, sourceMap }),

    plugins.define({ env: 'development', opts: environmentVars }),
    generateHTML &&
      plugins.generateHTML({
        title: PROJECT.title,
        template: PATHS.templateDir + '/index_watch.ejs',
        filename: 'index.html',
        writeHTMLToDisk,
        opts: {
          baseHref: PROJECT.baseHref,
          devServer: PUBLIC_PATH,
        },
      }),
    writeHTMLToDisk && plugins.writeHTMLtoDisk({ outputPath: PATHS.htmlOutPath }),
    sourceMap &&
      plugins.generateDevSourceMaps({
        exclude: new RegExp(PROJECT.vendorName + '|' + PROJECT.manifestName),
      }),

    plugins.provideReact(),
    plugins.setExtraPlugins([new webpack.HotModuleReplacementPlugin()]),
  ]);
};
