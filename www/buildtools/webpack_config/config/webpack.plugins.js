/* eslint-disable spaced-comment */

const webpack                     = require("webpack");
const CleanWebpackPlugin          = require("clean-webpack-plugin");
const HTMLWebpackPlugin           = require("html-webpack-plugin");
// const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const CopyWebpackPlugin           = require("copy-webpack-plugin");
const { BundleAnalyzerPlugin }    = require("webpack-bundle-analyzer");
const InlineManifestWebpackPlugin = require("inline-manifest-webpack-plugin");
const ServiceWorkerWebpackPlugin  = require("serviceworker-webpack-plugin");
/****************************************
 *         P  L  U  G  I  N  S
 ***************************************/
exports.define = ({ env = "development", opts }) => ({
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(env)
      },
      ...opts
    })
  ]
});

exports.cleanDirectory = ({ directory, projectRoot }) => ({
  plugins: [new CleanWebpackPlugin([directory], { root: projectRoot, verbose: true })]
});

exports.enableScopeHoisting = () => ({
  plugins: [new webpack.optimize.ModuleConcatenationPlugin()]
});

exports.copy = ({ copyPaths, copyOptions = {} }) => ({
  plugins: [new CopyWebpackPlugin(copyPaths, copyOptions)]
});

exports.setExtraPlugins = (pluginsArray) => ({
  plugins: pluginsArray
});

exports.runWebpackBundleAnalyzer = () => ({
  plugins: [new BundleAnalyzerPlugin()]
});

exports.define = ({ env = "development", opts }) => ({
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(env)
      },
      ...opts
    })
  ]
});

// exports.writeHTMLtoDisk = ({ outputPath }) => ({
//   plugins: [
//     new HtmlWebpackHarddiskPlugin({
//       outputPath: outputPath,
//     }),
//   ],
// });
//
// exports.generateHTML = ({ title, template, filename = 'index.html', writeToDisk = false }) => ({
//   plugins: [
//     new HTMLWebpackPlugin({
//       title: title,
//       template: template,
//       filename: filename,
//       inject: false,
//       // alwaysWriteToDisk: writeToDisk,
//
//       // Inline all files which names start with “runtime~” and end with “.js”.
//       // That’s the default naming of runtime chunks
//       // inlineSource: 'webpackManifest~.+\\.js',
//     }),
//   ],
// });

exports.generateHTML = ({
                          title,
                          filename = "index.html",
                          inject = false,
                          pathToTemplate,
                          baseHref,
                          opts
                        }) => ({
  plugins: [
    new HTMLWebpackPlugin({
      title,
      template: pathToTemplate,
      filename,
      inject,
      baseHref,
      ...opts
    })
  ]
});

exports.inlineManifest = () => ({
  plugins: [new InlineManifestWebpackPlugin("webpackManifest")]
});

/****************************************
 *         S E R V I C E   W O R K E R
 ***************************************/
exports.addServiceWorker = ({ entry }) => ({
  plugins: [
    new ServiceWorkerWebpackPlugin({
      entry,
      excludes: [
        "*.xml",
        "*.txt",
        ".htaccess",
        "**/*.map",
        "*.html",
        "**/*.xsl",
        "sw.js",
        "**/.DS_Store",
        "node_modules"
      ]
    })
  ]
});
